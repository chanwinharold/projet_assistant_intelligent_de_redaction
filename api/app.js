const express = require("express")
const cors = require("cors")

const app = express()
const corsOptions = {
    origin: `http://localhost/${process.env.PORT}`,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

app.use((req, res) => {
    res.status(404).json({message : "Route Introuvable !"})
})

module.exports = app;