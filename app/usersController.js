const model = require("./model")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    }
}

const encryptPass = async (password) => {

    let encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}


module.exports = {
    register: async (data)  => {
        const transporter = nodemailer.createTransport(config)
        data = JSON.parse(data)

        const userPass = await encryptPass(data.password)
        const newUser = new model.User(data.name, data.lastName, data.email, userPass)
        model.users.push(newUser)

        let token =  jwt.sign({mail: data.email}, process.env.ACCESS_TOKEN, {expiresIn: "1h"})

        let link = "http://localhost:3000/api/user/confirm/" + token
        transporter.sendMail({
            from: "mateusz.czekaj332@yahoo.com",
            to: newUser.email,
            subject: "weryfikacja konta",
            text: "Klliknij w link aby aktywować konto: \n" + link,
            //html: "tekst"
        });

        return token;
    },
    confirm: (token) => {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return err
            
            for(let i =0; i< model.users.length; i++){
                if(model.users[i].email == user.mail){
                    model.users[i].confirmed = true;
                    return model.users[i]
                }
            }
        })

    },

    login: async (data)  => {

        data = JSON.parse(data)
        console.log(data)
        for(let i =0; i<model.users.length; i++){
            if(model.users[i].confirmed && model.users[i].email == data.email && await bcrypt.compare(data.password, model.users[i].password)){
                let token =  jwt.sign({mail: data.email}, process.env.ACCESS_TOKEN, {expiresIn: "1d"})
                console.log(token)
                return token
            }
        }

        return false;
    },

}