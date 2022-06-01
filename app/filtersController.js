const model = require("./model")
const jwt = require('jsonwebtoken');
const sharp = require("sharp");
require('dotenv').config();


module.exports = {
    getAllOptions: async (token) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data;
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            data = model.filtersOptions;
        })
        return data;
    },
    metadata: async (token, id) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data = []
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            let url
            for(let i = 0; i<model.photos.length; i++ )
                if(model.photos[i].id == id){
                    url = model.photos[i].url
                    break
                }

            data = new Promise(async (resolve, reject) => {
                try {
            
                    if (url) {
                        let meta = await sharp(url)
                            .metadata()
                        resolve(meta)
                    }
                    else {
                        resolve("url_not_found")
                    }
            
                } catch (err) {
                    reject(err.mesage)
                }
            })
        })
        return data;
    },
    filtr: async (token, data) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let ans
        await jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
            if(err)
                return false

            data = JSON.parse(data)
            let url
            let m
            for(let i = 0; i<model.photos.length; i++ )
                if(model.photos[i].id == data.id){
                    url = model.photos[i].url
                    m = i
                    break
                }
            switch(data.filter){
                case "rotate":
                    newUrl = url.replace(".PNG", "-rotated.PNG")
                    await sharp(url)
                        .rotate(data.value)
                        .toFile(newUrl);
                    model.photos[m].filter("rotate", newUrl)
                    break
                case "resize":
                    newUrl = url.replace(".PNG", "-resized.PNG")
                    await sharp(url)
                    .resize({
                        width: data.width,
                        height: data.height
                    })
                        .toFile(newUrl);
                    model.photos[m].filter("resize", newUrl)
                    break
                case "reformat":
                    newUrl = url.replace(".PNG", "-reformated." + data.format)
                    await sharp(url)
                        .toFormat(data.format)
                        .toFile(newUrl);
                    model.photos[m].filter("reformat", newUrl)
                    break
                case "grayscale":
                    newUrl = url.replace(".PNG", "-grayscale.PNG")
                    await sharp(url)
                        .grayscale()
                        .toFile(newUrl);
                    model.photos[m].filter("grayscale", newUrl)
                    break
                case "negate":
                    newUrl = url.replace(".PNG", "-negate.PNG")
                    await sharp(url)
                        .negate()
                        .toFile(newUrl);
                    model.photos[m].filter("negate", newUrl)
                    break
                case "tint":
                    newUrl = url.replace(".PNG", "-tinted.PNG" )
                    await sharp(url)
                        .tint({r:data.r, g:data.g, b:data.b})
                        .toFile(newUrl);
                    model.photos[m].filter("tint", newUrl)
                    break
            }

        })
    },
}