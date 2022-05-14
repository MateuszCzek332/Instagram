const model = require("./model")
const usersController = require("./usersController")
const getData = require("./getRequestData")

const router = async (req, res) => {
 
    switch (true) {
        case req.url == "/api/user/register" && req.method == "POST":
            let data = await getRequestData(req)
            usersController.register(data)
            res.end(data)
    }
}

module.exports = router