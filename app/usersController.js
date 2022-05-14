const model = require("./model")
const nodemailer = require("nodemailer")
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
        console.log(config)
        data = JSON.parse(data)
        console.log(data)

        let userPass = await encryptPass(data.password)
        let newUser = new model.User(data.name, data.lastName, data.email, userPass)

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