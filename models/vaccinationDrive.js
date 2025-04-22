const mongoose = require("mongoose");

const vaccinationDriveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  vaccine: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  doseCount: {
    type: Number,
    required: true,
  },
  grades: {
    type: [String], // Example: ["Grade 1", "Grade 2"]
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["upcoming", "completed"],
    default: "upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Drive = mongoose.model("vaccinationDrive", vaccinationDriveSchema);

module.exports = Drive;
