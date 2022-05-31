const tagsController = require("./tagsController")
const getData = require("./getRequestData")

const router = async (req, res) => {

    if( req.url == "/api/tags/raw" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await tagsController.getAllString(token)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data,null, 5))
    }
    else if( req.url == "/api/tags" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await tagsController.getAllJson(token)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data,null, 5))
    }
    else if(  req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.slice(10)
        console.log(id)
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await tagsController.getOne(token, id)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }else{
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data, null, 5) )
        }
    }
    else if( req.url == "/api/tags" && req.method == "POST"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await getRequestData(req)
        let ans = await tagsController.add(token ,data)
        if(ans == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(ans, null, 5))
    }

}

module.exports = router