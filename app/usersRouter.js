const usersController = require("./usersController")
const getData = require("./getRequestData")

const router = async (req, res) => {

    if( req.url == "/api/user/register" && req.method == "POST"){
        let data = await getRequestData(req)
        let token = await usersController.register(data)
        res.end(token)
    }
    else if( req.url == "/api/user/confirm/" && req.method == "POST"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        await usersController.confirm(token)
        res.end(token)
    }
    else if( req.url.match(/\/api\/user\/confirm\/(.*)/) && req.method == "GET"){
        let token = req.url.slice(18)
        await usersController.confirm(token)
        res.end(token)
    }
    else if( req.url == "/api/user/login" && req.method == "POST"){
        let data = await getRequestData(req)
        let token = await usersController.lo(data)
        res.end(token)
    }
    
}

module.exports = router