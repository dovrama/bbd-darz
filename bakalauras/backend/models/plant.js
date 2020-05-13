const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: { type: String, required: true },
  soil: { type: String, required: true },
  sunshine: { type: Number, required: true },
  moisture: { type: Number, required: true },
  wind: { type: Number, required: true },
  fertilizer: { type: String, required: true },
  fertilizerAmount: { type: Number, required: true },
  fertilizerPeriod: { type: Number, required: true },
  wateringPeriod: { type: Number, required: true },
  wateringAmount: { type: Number, required: true },
  seed: { type: Number, required: true },
  price: { type: Number, required: true },
  yieldCrop: { type: Number, required: true },
  color: { type: String, required: true },
  blossomTime: { type: String, required: true },
  blossomPeriod: { type: Number, required: true },
  compatability: { type: String, required: true },
  nonCompatability: { type: String, required: true },
  cropRotation: { type: String, required: true },
  harvestingTime: { type: String, required: true },
  seedingTime: { type: String, required: true },
  plantHeight: { type: Number, required: true },
  transplant: { type: String, required: true },
  hints: { type: String, required: true },
  spacing: { type: Number, required: true }
});

module.exports = mongoose.model('Plant', plantSchema);
