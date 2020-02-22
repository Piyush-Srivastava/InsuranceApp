const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormDetailsSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'forms'
  },
 dob: {
   type: Date,
   required: true
 },

 income: {
   type: Number,
   required: true
 },

 FirstName: {
   type: String,
   required: true
 },
 LastName: {
  type: String,
  required: true
},
MiddleName: {
  type: String,
  required: true
},

pincode: {
  type: Number,
  required: true
},
pan: {
  type: String,
  required: true
},
mobileNumber: {
  type: Number,
  required: true
},
emp_type: {
  type: String,
  required: true
},
experience:{
  type: String
}

});

module.exports = FormDetails = mongoose.model('FormDetails', FormDetailsSchema);