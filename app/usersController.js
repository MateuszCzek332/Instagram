const model = require("./model")
const nodemailer = require("nodemailer")
require('dotenv').config();
const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    }
}

module.exports = {
    register: (data) => {
        const transporter = nodemailer.createTransport(config)
        console.log(config)
        data = JSON.parse(data)
        console.log(data)

        let newUser = new model.User(data.name, data.lastName, data.email, encryptPass(data.password))

        transporter.sendMail({
            from: "mateusz.czekaj332@yahoo.com",
            to: newUser.email,
            subject: "weryfikacja konta",
            text: "tekst",
            //html: "tekst"
        });

        model.users.push(newUser)
        console.log(model.users)
    },

}