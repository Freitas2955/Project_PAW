var mongoose = require('mongoose');

var PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9
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
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Partner', PartnerSchema);