class User {
    constructor(name, lastName, email, password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmed = false;
    }
}

class Image {
    constructor( originalname, album, url) {
        this.id = Date.now()
        this.album = album;
        this.originalname = originalname;
        this.url = url;
        this.lastChange = "original";
        this.history = [
            {
                status: "original",
                lastModifiedDate: Date.now(), 
            }
        ];
    }

    update = ( status )=>{
        this.history.push({
            status: status,
            lastModifiedDate: Date.now()
        })
        this.lastChange = status
    }
}

let users = []
let photos = []
let badTokens = []

module.exports = { User, Image, photos, users, badTokens };