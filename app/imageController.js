const model = require("./model")
const jsonController = require("./jsonController")
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require("fs")
require('dotenv').config();

module.exports = {
    newFile: async (token, req)  => {

        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        await jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
            if(err)
                return false

            const form = formidable({});
            form.uploadDir = "upload/"    
            form.keepExtensions = true;

            form.parse(req, function (err, fields, files) {
                let fileName = files.file.path.split("\\")[1];
                let url = "upload/" +  user.email + "/" + fileName
                if(fs.existsSync("./upload/" + user.email) ){
                    fs.rename("upload/" + fileName, url, (err) => {
                        if (err) throw err
                    })
                }
                else{
                    fs.mkdir("./upload/" + user.email, (err) => {
                        if (err) throw err
                        fs.rename("upload/" + fileName, url, (err) => {
                            if (err) throw err
                        })
                    })
                }
                jsonController.add(files, user.email, url)
            })

        })

    },
    deleteFile: async (url)  => {

        fs.unlink(url,  (err) =>{
            if (err){ 
                console.log(err)
                return false
            }
        })
    }

}
