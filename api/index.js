require("dotenv").config();
const app = require("./app");
const db = require("./database");

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await db`SELECT 1`; // Test de connexion
        console.log("✅ Base de données connectée");

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Impossible de se connecter à la base :", error.message);
        process.exit(1);
    }
}

start();