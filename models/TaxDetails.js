const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taxSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userDetails"
  },
  panCardNo: {
    type: String,
    required: true
  },

  taxableAmount: {
    type: Number,
    required: true
  },
  annualIncome: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("taxDetails", taxSchema);
