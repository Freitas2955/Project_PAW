var mongoose = require("mongoose");

var Requestchema = new mongoose.Schema({
  donatorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  donationId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  postCode: {
    type: String,
    required: true,
    match: /^\d{4}-\d{3}$/ 
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  done: {
    type: Boolean,
    default: false
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Request", Requestchema);
