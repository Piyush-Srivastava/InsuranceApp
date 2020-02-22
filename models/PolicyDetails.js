const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const policyDetailsSchema = mongoose.Schema({
  policyName: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = PolicyDetails = mongoose.model(
  "policyDetails",
  policyDetailsSchema
);
