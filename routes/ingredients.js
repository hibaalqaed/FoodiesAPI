const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  ingredientList,
  recipeCreate,
} = require("../controllers/ingredientController");

//Ingredient List
router.get("/", ingredientList);

//Recipe Create
router.post("/:id/recipes", upload.single("image"), recipeCreate);

module.exports = router;
