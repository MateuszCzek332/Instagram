const http = require('http');
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const usersRouter = require("./app/usersRouter")
require('dotenv').config();

http.createServer(async (req, res) => {

    //images
    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }// tags
    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }
    //users
    else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
    }
 
})
.listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))