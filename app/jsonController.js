const model = require("./model")
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    add: async (file, album, url)  => {
        let newPhoto = new model.Image(file.file.name, album, url )
        model.photos.push(newPhoto)
    },
    getAll: async (token) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            data = model.photos
        })
        return data;
    },
    getOne: async (token, id) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    data = model.photos[i]
                    break;
                }

        })
        return data;
    },
    update: async (token, id, status) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false
        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err){
                console.log(err)
                return false
            }
            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    model.photos[i].update( status )
                    data = model.photos[i]
                    break;
                }


        })
        return data;
    },
    delete: async (token, id) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false
        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err){
                console.log(err)
                return false
            }
            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    data = model.photos[i].url
                    model.photos.splice(i, 1);
                    break;
                }


        })
        return data;
    },
    addTag: async (token, id, tag) => {
        tag = JSON.parse(tag)
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false
        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err){
                console.log(err)
                return false
            }
            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    model.photos[i].tags.push(tag)
                    data = model.photos[i]
                    break;
                }

        })
        return data;
    },
    addTags: async (token, id, tags) => {
        tags = JSON.parse(tags)
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false
        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err){
                console.log(err)
                return false
            }
            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    for(let j = 0; j<tags.length; j++)
                        model.photos[i].tags.push(tags[j])
                    data = model.photos[i]
                    break;
                }

        })
        return data;
    },
    getPhotoTags: async (token, id) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            for(let i =0 ; i<model.photos.length; i++)
                if(id == model.photos[i].id){
                    data = model.photos[i].tags
                    break;
                }

        })
        return data;
    }

}