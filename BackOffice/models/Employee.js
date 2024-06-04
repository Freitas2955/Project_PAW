var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
  password: {
    type: String,
    required: true,
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);