const filtersController = require("./filtersController")
const getData = require("./getRequestData")

const router = async (req, res) => {

    if( req.url == "/api/filters" && req.method == "GET"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await filtersController.getAllOptions(token)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data,null, 5))
    }
    else if(  req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.slice(22)
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await filtersController.metadata(token, id)
        if(data == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }else{
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data, null, 5) )
        }
    }
    else if( req.url == "/api/filters" && req.method == "PATCH"){
        let token
        if(req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1]
        let data = await getRequestData(req)
        let ans = await filtersController.filtr(token, data)
        if(ans == false){
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end("Blad, zaloguj sie ponownie")
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end("Edycja pomyślna")
    }

}

module.exports = router