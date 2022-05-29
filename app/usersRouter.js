const usersController = require("./usersController")
const getData = require("./getRequestData")

const router = async (req, res) => {

    if( req.url == "/api/user/register" && req.method == "POST"){
        let data = await getRequestData(req)
        let token = await usersController.register(data)
        if(token == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("user exist")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(token)
    }
    else if( req.url == "/api/user/confirm/" && req.method == "POST"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let ans = await usersController.confirm(token)
        if(ans == false ){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end("Link wygasł")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("Weryfikacja poprawna")
    }
    else if( req.url.match(/\/api\/user\/confirm\/(.*)/) && req.method == "GET"){
        let token = req.url.slice(18)
        let ans = await usersController.confirm(token)
        if(ans == false){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end("Link wygasł")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("Weryfikacja poprawna")
    }
    else if( req.url == "/api/user/login" && req.method == "POST"){
        let data = await getRequestData(req)
        let token = await usersController.login(data)
        if(token == false){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end("błędny email lub haslo")
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(token)
    }
    else if( req.url == "/api/user/logout" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let ans = await usersController.logout(token)
        if(ans){
            res.writeHead(200, { "Content-Type": "application/json" }); // token authorized
            res.end("Wylogowales sie")
        }
    }
    else if( req.url == "/api/user" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let ans = await usersController.getInfo(token)
        if(ans == false){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(ans)
    }
    else if( req.url == "/api/user" && req.method == "PATCH"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await getRequestData(req)
        let ans = await usersController.updateInfo(token, data)
        if(ans == false){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("eMail poprawnie zmieniony")
    }

}

module.exports = router