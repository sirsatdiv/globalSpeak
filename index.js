const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000

let result = []
let goals = []

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({
        result,
        message: "Data stored successfully!"
    })
})

app.post("/store", (req, res) => {
    const { oText, tText } = req.body

    result.push({ oText, tText })
     
    res.json({
        result,
        message: "Data stored successfully!"
    })
})

app.get("/goals", (req, res) => {
    res.json({
        goals,
        message: "Data stored successfully!"
    })
})

app.post("/storegoal", (req, res) => {
    const { g_name, category, desc } = req.body

    result.push({ g_name, category, desc })
     
    res.json({
        goals,
        message: "Data stored successfully!"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:{port}`)
})
