const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth.middleware")
const {createArticle, getAllArticle, getOneArticle, updateArticle, deleteArticle} = require("../controllers/article.controller");

router.post("/", auth, createArticle);
router.get("/", auth, getAllArticle);
router.get("/:id", auth, getOneArticle);
router.put("/:id", auth, updateArticle);
router.delete("/:id", auth, deleteArticle);

module.exports = router;