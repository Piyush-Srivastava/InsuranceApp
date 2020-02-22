const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userPolicySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userDetails"
  },
  policyDetails: {
    type: Schema.Types.ObjectId,
    ref: "policyDetails"
  }
});

module.exports = mongoose.model("userPolicy", userPolicySchema);
