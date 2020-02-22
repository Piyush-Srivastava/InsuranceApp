const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Gender: String,
  DateOfBirth: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("userDetails", userDetailsSchema);
