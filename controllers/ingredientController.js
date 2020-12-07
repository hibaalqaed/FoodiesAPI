const { Ingredient, Category, Recipe } = require("../db/models");

//Ingredient List
exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
        // model: Recipe,
        // as: "recipes",
        // attributes: ["id"],
      },
    });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

//Recipe Create
exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.ingredientsId = req.params.id;

    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
