const express = require("express")
const router = express.Router()

const {login, signup, verifyEmail, uploadImage, getAuthMe} = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const upload= require("../middlewares/multer.middleware")

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', verifyEmail);
router.post('/image', upload.single("image"), uploadImage)
router.get('/me', auth, getAuthMe);

module.exports = router;