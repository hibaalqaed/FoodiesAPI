const express = require("express");
const router = express.Router();
const { ingredientList } = require("../controllers/ingredientController");

//Ingredient List
router.get("/", ingredientList);

module.exports = router;
