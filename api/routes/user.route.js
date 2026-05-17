const express = require("express");
const router = express.Router();

const {
    login,
    signup,
    logout,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    uploadImage,
    getAuthMe,
    updateProfile,
    changePassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyEmail);
router.post("/verify", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/image", upload.single("image"), uploadImage);
router.get("/me", auth, getAuthMe);
router.put("/profile", auth, updateProfile);
router.put("/password", auth, changePassword);

module.exports = router;
