const express = require("express");

const Plant = require("../models/plant");

const router = express.Router();

router.get("", (req, res, next) => {
  Plant.find().then(documents => {
    res.status(200).json({
      message: "Plants fetched successfully!",
      plants: documents
    });
  });
});

module.exports = router;
