const postgres = require("postgres");

const db = postgres({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "intelli_redac_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || process.env.DB_PASSWORD_ALT
})

module.exports = db;