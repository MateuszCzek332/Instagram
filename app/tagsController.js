const model = require("./model")
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    add: async (token, data)  => {

        for(let i = 0; i<model.badTokens.length; i++)
        if(model.badTokens[i] == token)
            return false

        let ans;
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            data = JSON.parse(data)
            let id = model.tags[model.tags.length-1].id + 1
            ans =  new model.Tag(id, data.name, data.popularity)
            model.tags.push(ans)
        })
        return data;
    },
    getAllString: async (token) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data = []
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            for(let i=0; i<model.tags.length; i++)
                data.push(model.tags[i].name)
        })
        return data;
    },
    getAllJson: async (token) => {
        for(let i = 0; i<model.badTokens.length; i++)
            if(model.badTokens[i] == token)
                return false

        let data = []
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return false

            for(let i=0; i<model.tags.length; i++)
                data.push(model.tags[i])
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

            for(let i =0; i<model.tags.length; i++)
                if(id == model.tags[i].id){
                    data = model.tags[i]
                    break
                }

        })
        return data;
    },

}