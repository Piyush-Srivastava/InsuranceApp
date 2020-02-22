const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
   firstName:{
     type: String,
     required: true
   },
   lastName:{
    type: String,
    required: true
  }, 
  city:{
    type: String,
    required: true
  }, 
  mobileNumber:{
    type: Number,
    required: true
  }
});

module.exports = Form = mongoose.model('Form', FormSchema);