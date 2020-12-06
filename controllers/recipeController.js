const { Recipe } = require("../db/models");

//Recipe List
exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   include: {
      //     model: Category,
      //     as: "categories",
      //     attributes: ["name"],
      //   },
    });
    res.json(recipes);
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
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
