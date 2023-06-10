const axios = require('axios');

const operations = require('./utils');

exports.convert = async (req, res) => {
    try {

        const {httpsTOhttp, changeCorsDataType, removeEmptyFields, expandShortForm, lowerCaseAll, upperCaseAll, custom} = req.body;

        if(custom){
            if(httpsTOhttp || changeCorsDataType || expandShortForm || lowerCaseAll || upperCaseAll ){
                return res.status(400).json({
                    success: false,
                    error: "Cannot select any operation when custom is selected"
                });
            }
            var {
                API,
                Description,
                Auth,
                HTTPS,
                Cors,
                Link,
                Category
            } = custom;
        }



        // console.log(req.body.custom);

        if(!httpsTOhttp && !changeCorsDataType && !removeEmptyFields && !expandShortForm && !lowerCaseAll && !upperCaseAll && !custom){
            return res.status(400).json({
                success: false,
                error: "Please select atleast one operation"
            });
        }

        if(lowerCaseAll && upperCaseAll){
            return res.status(400).json({
                success: false,
                error: "Cannot select both lowerCaseAll and upperCaseAll"
            });
        }

        const {data} = await axios.get('https://api.publicapis.org/entries');

        if(!data){
            return res.status(404).json({
                success: false,
                error: "Data not found"
            });
        }

        // Batch processing
        const batch = req.body.batch;
        if(batch){
            const output = {};
            
            for(let i=0; i<data.entries.length; i+=200){
                const temp = data.entries.slice(i, i+200);
                operations(temp,{
                    httpsTOhttp,
                    changeCorsDataType,
                    removeEmptyFields,
                    expandShortForm,
                    upperCaseAll,
                    lowerCaseAll,
                    custom
                })
                output.push(temp);
            }

            return res.status(200).json({
                data: output,
            })
        }

        // Single processing
        operations(data.entries,{
            httpsTOhttp,
            changeCorsDataType,
            removeEmptyFields,
            expandShortForm,
            upperCaseAll,
            lowerCaseAll,
            custom
        })

        res.status(200).json({
            data:data.entries,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}