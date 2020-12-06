const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//Routes
const categoryRoutes = require("./routes/categories");
const ingredientRoutes = require("./routes/ingredients");
const recipeRoutes = require("./routes/recipes");
//Database
const db = require("./db/models");

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/recipes", recipeRoutes);

//NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({ messagae: "Path Not Found!" });
});
//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
