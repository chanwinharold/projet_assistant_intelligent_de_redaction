require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const db = require("../database");

async function main() {
    await db`
        ALTER TABLE ir_user
        ADD COLUMN IF NOT EXISTS user_prenom VARCHAR(50),
        ADD COLUMN IF NOT EXISTS user_nom VARCHAR(50)
    `;
    console.log("Colonnes user_prenom / user_nom ajoutées.");

    await db`
        UPDATE ir_user
        SET
            user_prenom = COALESCE(NULLIF(TRIM(user_prenom), ''), user_name),
            user_nom = COALESCE(NULLIF(TRIM(user_nom), ''), '')
        WHERE user_prenom IS NULL OR TRIM(user_prenom) = ''
    `;
    console.log("Comptes existants mis à jour.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
