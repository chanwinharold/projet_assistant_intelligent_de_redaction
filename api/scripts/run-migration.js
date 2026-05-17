require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const db = require("../database");

async function main() {
    const file = process.argv[2] || path.join(__dirname, "../migrations/002_user_prenom_nom.sql");
    const sql = fs.readFileSync(file, "utf8");
    const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s && !s.startsWith("--"));

    for (const statement of statements) {
        await db.unsafe(statement);
        console.log("OK:", statement.slice(0, 60).replace(/\s+/g, " ") + "...");
    }
    console.log("Migration terminée.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
