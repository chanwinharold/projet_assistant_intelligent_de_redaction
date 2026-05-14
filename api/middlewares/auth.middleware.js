const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.authToken
        const decodedToken = jwt.verify(token, process.env.JWT_USER_AUTH_TOKEN)
        req.auth = {id_user: decodedToken.id_user}
        next();
    } catch (err) {
        throw new Error(err)
    }
}