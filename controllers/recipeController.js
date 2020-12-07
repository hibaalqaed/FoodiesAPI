const { Recipe, Ingredient } = require("../db/models");

//Recipe List
exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["name"],
      },
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};
