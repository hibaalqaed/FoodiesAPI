const { Ingredient, Category } = require("../db/models");

//Ingredient List
exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
      },
    });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};
