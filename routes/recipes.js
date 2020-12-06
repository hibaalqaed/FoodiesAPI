const express = require("express");
const router = express.Router();
const { recipeList, recipeCreate } = require("../controllers/recipeController");
const upload = require("../middleware/multer");

//Recipe List
router.get("/", recipeList);

//Recipe Create
router.post("/", upload.single("image"), recipeCreate);

module.exports = router;
