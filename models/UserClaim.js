const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userClaimSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userDetails"
  },
  claimDetails: [
    {
      code: {
        type: String,
        required: true
      },
      nature: {
        type: String,
        required: true
      },

      clinicPinCode: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      regNo: {
        type: Number,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
      clinicName: {
        type: String,
        required: true
      },
      claimAmount: {
        type: Number,
        required: true
      },
      status: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("userClaim", userClaimSchema);
