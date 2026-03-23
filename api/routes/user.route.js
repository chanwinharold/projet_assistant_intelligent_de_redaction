const express = require("express")
const router = express.Router()

const {login, signup, verifyEmail, uploadImage} = require("../controllers/user.controller")
const upload= require("../middlewares/multer.middleware")

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', verifyEmail);
router.post('/image', upload.single("user_image"), uploadImage)

module.exports = router;