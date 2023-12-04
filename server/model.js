// updatedModel.js
const mongoose = require("mongoose");

const updatedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: [String],
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  architecture: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
});

const UpdatedData = mongoose.model("UpdatedData", updatedSchema);

module.exports = UpdatedData;
