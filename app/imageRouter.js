const imageController = require("./imageController")
const jsonController = require("./jsonController")
const getData = require("./getRequestData")

const router = async (req, res) => {

    if( req.url == "/api/photos" && req.method == "POST"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await imageController.newFile(token, req)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("Plik przesłany")
    }
    else if( req.url == "/api/photos" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await jsonController.getAll(token)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }else{
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data, null, 5) )
        }
    }
    else if(  req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.slice(12)
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await jsonController.getOne(token, id)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }else{
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data, null, 5) )
        }
    }
    else if(  req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE"){
        let id = req.url.slice(12)
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await jsonController.delete(token, id)
        let ans =  await imageController.deleteFile(data)
        if(ans == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }else{
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("Plik usuniety")
        }
    }
    


}

module.exports = router