var mongoose = require('mongoose');

var DonatorSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  postCode: String,
  city:String,
  password:String,
  points:Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donator', DonatorSchema);