const postgres = require("postgres");

function createDb() {
    if (process.env.DATABASE_URL) {
        return postgres(process.env.DATABASE_URL, { ssl: "require" });
    }
    return postgres({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "intelligent_redac",
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || process.env.DB_PASSWORD_ALT,
    });
}

module.exports = createDb();
