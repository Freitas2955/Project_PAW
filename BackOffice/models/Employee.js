var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  postCode: String,
  city:String,
  password:String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', EmployeeSchema);