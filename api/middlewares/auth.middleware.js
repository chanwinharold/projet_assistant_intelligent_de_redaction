const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ message: "Non authentifié" });
        }

        const secret = process.env.JWT_USER_AUTH_TOKEN || process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, secret);
        req.auth = { id_user: decodedToken.id_user };
        next();
    } catch {
        return res.status(401).json({ message: "Token invalide" });
    }
};
