const express = require("express")
const bodyParser = require("body-parser")
const app = express()

let todoItems = []

app.use(bodyParser.json())

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "content-type")
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS,PATCH")
    next()
})

app.get("/items", (req, res) => {
    res.send(todoItems)
})

app.post("/items", (req, res) => {
    if (req.body) {
        todoItems = [...todoItems, req.body]
    }
    res.send(todoItems)
})

app.delete("/items", (req, res) => {
    if (req.body) {
        todoItems.forEach((item) => {
            if (item.id === req.body.id) {
                item.isDelete = true
            }
        })
    }
    res.send(todoItems)
})

app.listen(8000, () => {
    console.log("Server running at http://127.0.0.1:8000/")
})