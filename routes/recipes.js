const express = require("express");
const router = express.Router();
const { recipeList, recipeCreate } = require("../controllers/recipeController");

//Recipe List
router.get("/", recipeList);

module.exports = router;
