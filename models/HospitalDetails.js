const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  nature: {
    type: String,
    required: true
  },
  regNo: {
    type: Number,
    required: true
  },

  patientName: {
    type: String,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  billAmount: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("hospitalDetails", hospitalSchema);
