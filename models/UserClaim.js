const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userClaimSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userDetails"
  },
  claimDetails: [
    {
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
      claimedAmount: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("userClaim", userClaimSchema);
