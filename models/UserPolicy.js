const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userPolicySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userDetails"
  },
  policyDetails: [
    {
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
      date: {
        type: Date,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("userPolicy", userPolicySchema);
