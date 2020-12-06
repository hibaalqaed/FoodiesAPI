const express = require("express");
const router = express.Router();
const {
  categoryList,
  categoryCreate,
  ingredientCreate,
} = require("../controllers/categoryController");
const upload = require("../middleware/multer");

//Category List
router.get("/", categoryList);

//Category Create
router.post("/", upload.single("image"), categoryCreate);

//Ingredient Create
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

module.exports = router;
