const express = require("express")
const router = express.Router()

const {login, signup, verifyEmail} = require("../controllers/user.controller")

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', verifyEmail);

module.exports = router;