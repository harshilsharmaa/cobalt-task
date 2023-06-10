const longForm = {
    API : "Application Programming Interface",
    Auth: "Authentication",
    HTTPS: "Hyper Text Transfer Protocol Secure",
    HTTP: "Hyper Text Transfer Protocol",
    Cors: "Cross Origin Resource Sharing"
}

function operations(data, {httpsTOhttp, changeCorsDataType, removeEmptyFields, expandShortForm, lowerCaseAll, upperCaseAll, custom}){
    data.map((item) => {
        if(httpsTOhttp){
            item.HTTP = item.HTTPS;
            delete item.HTTPS
        }

        if(changeCorsDataType){
            if(item.Cors === "yes"){
                item.Cors = true;
            }
            else item.Cors = false; 
        }

        if(removeEmptyFields || expandShortForm || lowerCaseAll || upperCaseAll || custom){

            Object.keys(item).forEach((key) => {
                if(removeEmptyFields){
                    if (item[key] === "") {
                        delete item[key];
                    }
                }

                if(custom){
                    if(custom[key]){
                        item[custom[key]] = item[key];
                        delete item[key];
                    }
                }
    
                if(expandShortForm){
                    if(key==="API") {
                        item[longForm.API] = item[key];
                        delete item[key];
                    }
                    else if(key==="Auth"){
                        item[longForm.Auth] = item[key];
                        delete item[key];
                    }
                    else if(key==="HTTPS"){
                        item[longForm.HTTPS] = item[key];
                        delete item[key];
                    }
                    else if(key==="HTTP"){
                        item[longForm.HTTP] = item[key];
                        delete item[key];
                    }
                    else if(key==="Cors"){
                        item[longForm.Cors] = item[key];
                        delete item[key];
                    }
                }
    
                if(lowerCaseAll){
                    const lowerCasedKey = key.toLowerCase();
                    if(key!==lowerCasedKey){
                        item[key.toLowerCase()] = item[key];
                        delete item[key];
                    }
                }
    
                if(upperCaseAll){
                    const upperCasedKey = key.toUpperCase();
                    if(key!==upperCasedKey){
                        item[key.toUpperCase()] = item[key];
                        delete item[key];
                    }
                }
    
            })
        }


    })
}

module.exports = operations;