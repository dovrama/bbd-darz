const express = require("express");

const Plant = require("../models/plant");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const plant = new Plant({
    name: req.body.name,
    soil: req.body.soil,
    sunshine: req.body.sunshine,
    moisture: req.body.moisture,
    wind: req.body.wind,
    fertilizer: req.body.fertilizer,
    fertilizerAmount: req.body.fertilizerAmount,
    fertilizerPeriod: req.body.fertilizerPeriod,
    wateringPeriod: req.body.wateringPeriod,
    wateringAmount: req.body.wateringAmount,
    seed: req.body.seed,
    price: req.body.price,
    yieldCrop: req.body.yieldCrop,
    color: req.body.color,
    blossomTime: req.body.blossomTime,
    blossomPeriod: req.body.blossomPeriod,
    compatability: req.body.compatability,
    nonCompatability: req.body.nonCompatability,
    cropRotation: req.body.cropRotation,
    harvestingTime: req.body.harvestingTime,
    seedingTime: req.body.seedingTime,
    plantHeight: req.body.plantHeight,
    transplant: req.body.transplant,
    hints: req.body.hints,
    spacing: req.body.spacing,
  });
  plant.save().then(createdPlant => {
    res.status(201).json({
      message: "Plant added successfully",
      plantId: createdPlant._id
    });
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const plant = new Plant({
    _id: req.body.id,
    name: req.body.name,
    soil: req.body.soil,
    sunshine: req.body.sunshine,
    moisture: req.body.moisture,
    wind: req.body.wind,
    fertilizer: req.body.fertilizer,
    fertilizerAmount: req.body.fertilizerAmount,
    fertilizerPeriod: req.body.fertilizerPeriod,
    wateringPeriod: req.body.wateringPeriod,
    wateringAmount: req.body.wateringAmount,
    seed: req.body.seed,
    price: req.body.price,
    yieldCrop: req.body.yieldCrop,
    color: req.body.color,
    blossomTime: req.body.blossomTime,
    blossomPeriod: req.body.blossomPeriod,
    compatability: req.body.compatability,
    nonCompatability: req.body.nonCompatability,
    cropRotation: req.body.cropRotation,
    harvestingTime: req.body.harvestingTime,
    seedingTime: req.body.seedingTime,
    plantHeight: req.body.plantHeight,
    transplant: req.body.transplant,
    hints: req.body.hints,
    spacing: req.body.spacing,
  });
  Plant.updateOne({ _id: req.params.id }, plant).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(200).json({ message: "Update failed!" });
    }
  });
});

router.get("", checkAuth, (req, res, next) => {
  Plant.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      plants: documents
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  Plant.findById(req.params.id).then(plant => {
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(404).json({ message: "Plant not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Plant.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Plant deleted!" });
  });
});

module.exports = router;
