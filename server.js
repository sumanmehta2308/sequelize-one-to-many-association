const express = require("express");
const sequelize = require("./config/database");

require("dotenv").config();
const userRoutes = require("./routes/userR");
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
