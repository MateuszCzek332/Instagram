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
        this.tags = []
    }

    update = ( status )=>{
        this.history.push({
            status: status,
            lastModifiedDate: Date.now()
        })
        this.lastChange = status
    }

    filter = ( status, url )=>{
        this.history.push({
            status: status,
            lastModifiedDate: Date.now(),
            url: url
        })
        this.lastChange = status
    }
}
class Tag{
    constructor(id, name, popularity){
        this.id = id
        this.name = name
        this.popularity = popularity
    }
}

let tags = [
    {
         id: 0,
         name: "#love",
         popularity: 242
    },
    {
         id: 1,
         name: "#instagood",
         popularity: 433
    },
    {
         id: 2,
         name: "#fashion",
         popularity: 195
    },
    {
         id: 3,
         name: "#photooftheday",
         popularity: 215
    },
    {
         id: 4,
         name: "#beautiful",
         popularity: 828
    },
]

let filtersOptions = [
    {
      id: 1,
      name: "metadata",
      description: "dostępne informacje o zdjęciu",
      method: "get",
      args: "bez argumentów"
    },
    {
      id: 2,
      name: "rotate",
      description: "obrót w stopniach w prawo, ujemna wartość w lewo",
      method: "patch",
      args: "id obrazka, wartość x = 0-360"
    },
    {
      id: 3,
      name: "resize",
      description: "obrót w stopniach w prawo, ujemna wartość w lewo",
      method: "patch",
      args: "id obrazka, w, h"
    }
  ]

let users = []
let photos = []
let badTokens = []

module.exports = { User, Image, Tag, tags, photos, users, badTokens, filtersOptions };