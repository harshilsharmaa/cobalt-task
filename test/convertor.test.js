let chai = require('chai');
let chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
let expect = chai.expect;
chai.use(chaiHttp);
const axios = require('axios');

describe('Convertor API - giving wrong commands', ()=>{
    it('when lowerCase and upperCase both true', async()=>{
        try{
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                httpsTOhttp: true,
                changeCorsDataType: true,
                removeEmptyFields: true,
                expandShortForm: true,
                lowerCaseAll: true,
                upperCaseAll: true
            })

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error').to.equal('Cannot select both lowerCaseAll and upperCaseAll');
        }
        catch(error){
            throw error;
        }
    })

    it('when no operation is selected', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                httpsTOhttp: false,
                changeCorsDataType: false,
                removeEmptyFields: false,
                expandShortForm: false,
                lowerCaseAll: false,
                upperCaseAll: false
            })

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error').to.equal('Please select atleast one operation');

        } catch (error) {
            throw error;
        }
    })
})

describe('Convertor API - giving correct commands', ()=>{
    let externalData;

    before(async()=>{
        const {data} = await axios.get('https://api.publicapis.org/entries');
        externalData = data;
    })

    it('when upperCaseAll is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                httpsTOhttp: false,
                changeCorsDataType: false,
                removeEmptyFields: false,
                expandShortForm: false,
                lowerCaseAll: false,
                upperCaseAll: true
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.key('API', 'DESCRIPTION', 'AUTH', 'HTTPS', 'CORS', 'LINK', 'CATEGORY');
 
        } catch (error) {
            throw error;
        }
    })

    it('when lowerCaseAll is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                lowerCaseAll: true,
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.key('api', 'description', 'auth', 'https', 'cors', 'link', 'category');
 
        } catch (error) {
            throw error;
        }
    })

    it('when expandShortForm is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                expandShortForm: true,
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.key('Application Programming Interface', 'Description', 'Authentication', 'Hyper Text Transfer Protocol Secure', 'Cross Origin Resource Sharing', 'Link', 'Category');
 
        } catch (error) {
            throw error;
        }
    })

    it('when removeEmptyFields is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                removeEmptyFields: true,
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            
            Object.keys(data[0]).forEach(key=>{
                expect(data[0][key]).to.not.equal('');
            })
 
        } catch (error) {
            throw error;
        }
    })

    it('when changeCorsDataType is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                changeCorsDataType: true,
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            
            expect(data[0]).to.have.property('Cors').to.be.a('boolean');
 
        } catch (error) {
            throw error;
        }
    })

    it('when httpsTOhttp is true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                httpsTOhttp: true,
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.property('HTTP')
            expect(data[0]).to.not.have.property('HTTPS')
 
        } catch (error) {
            throw error;
        }
    })

    it('when all operations are true', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                httpsTOhttp: true,
                changeCorsDataType: true,
                removeEmptyFields: true,
                expandShortForm: true,
                lowerCaseAll: true,
                upperCaseAll: false
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.key('Application Programming Interface', 'description', 'Authentication', 'Hyper Text Transfer Protocol', 'Cross Origin Resource Sharing', 'link', 'category');
            expect(data[0]).to.have.property('Cross Origin Resource Sharing').to.be.a('boolean');
            expect(data[0]).to.have.property('Hyper Text Transfer Protocol');
            expect(data[0]).to.not.have.property('hyper text transfer protocol secure');
 
        } catch (error) {
            throw error;
        }
    })

    it('when custom mapping is given', async()=>{
        try {
            
            const res = await chai.request('http://localhost:3000').post('/api/convert')
            .send({
                custom:{
                    API: "abcd",
                    Description: "des",
                    Auth: "auuuuuth",
                    HTTPS: "TCP",
                    Cors: "CSRF",
                    Link: "li",
                    Category: "cat"
                }
            })

            const {data} = res.body;

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(data).to.have.lengthOf(externalData.entries.length);
            expect(data[0]).to.have.key('abcd', 'des', 'auuuuuth', 'TCP', 'CSRF', 'li', 'cat');
 
        } catch (error) {
            throw error;
        }
    })


})