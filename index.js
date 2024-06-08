const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = exprsss()
const port = process.env.PORT || 5000

let result = []

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Server is running!")
})

app.post("/store", (req, res) => {
    const { oText, tText } = req.body

    result.push({ oText, tText })
     
    res.json({
        result,
        message: "Data stored successfully!"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:{port}`)
})