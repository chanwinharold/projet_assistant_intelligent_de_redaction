const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()
const userRoutes = require("./routes/user.route")
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", userRoutes);
app.use((req, res) => {
    res.status(404).json({message : "Route Introuvable !"})
})

module.exports = app;