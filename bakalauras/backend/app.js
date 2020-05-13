const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const plantsRoutes = require("./routes/plants");
const adminPlantsRoutes = require("./routes/adminPlants");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://dovydas:n8iAbu8xLW5YZUTh@cluster0-x2nee.mongodb.net/bakalauras"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/plants", plantsRoutes);
app.use("/api/admin/plants", adminPlantsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
