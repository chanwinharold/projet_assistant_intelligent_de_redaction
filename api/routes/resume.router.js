const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth.middleware")
const {createResume, getAllResume, getOneResume, updateResume, deleteResume} = require("../controllers/resume.controller")

router.post("/", auth, createResume)
router.get("/", auth, getAllResume)
router.get("/:id", auth, getOneResume)
router.put("/:id", auth, updateResume)
router.delete("/:id", auth, deleteResume)

module.exports = router;