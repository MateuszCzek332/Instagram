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

module.exports = { User, users };