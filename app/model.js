class User {
    constructor(name, lastName, email, password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmed = false;
    }
}

let users = []
let badTokens = []

module.exports = { User, users, badTokens };