"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relations
// A Category has many Ingredients
db.Category.hasMany(db.Ingredient, {
  as: "ingredients",
  foreignKey: { fieldName: "categoryId", allowNull: false },
});

// An Ingredient belongs to one Category only
db.Ingredient.belongsTo(db.Category, {
  as: "categories",
});

//An Ingredient has many recipes
//Liala said to check if this work then go with many to many so Im checking
db.Ingredient.hasMany(db.Recipe, {
  as: "recipes",
  foreignKey: { fieldName: "recipeId" },
});

db.Recipe.belongsTo(db.Ingredient, {
  as: "ingredients",
});

// // A Recipe has many Ingredients
// db.Recipe.belongsToMany(db.Ingredient, {
//   as: "ingredients",
//   foreignKey: { fieldName: "recipeId", allowNull: false },
// });

// // An Ingredient belongs to many Recipes
// db.Ingredient.belongsToMany(db.Recipe, {
//   as: "recipes",
//   foreignKey: { fieldName: "ingredientId", allowNull: false },
// });

module.exports = db;
