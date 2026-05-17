const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
    suggestTitle,
    autocomplete,
    rephrase,
    summarize,
} = require("../controllers/ai.controller");

router.post("/title", auth, suggestTitle);
router.post("/autocompletion", auth, autocomplete);
router.post("/rephrase", auth, rephrase);
router.post("/resume", auth, summarize);

module.exports = router;
