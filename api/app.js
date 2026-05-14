const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

const userRoutes = require("./routes/user.route")
const articleRoutes = require("./routes/article.route")
const resumeRoutes = require("./routes/resume.router")

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/auth", userRoutes);
app.use("/articles", articleRoutes)
app.use("/resumes", resumeRoutes)

app.use((req, res) => {
    res.status(404).json({message : "Route Introuvable !"})
})

module.exports = app;
