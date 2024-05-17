var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donatorId:String,
  donatorName:String,
  camisolas:Number,
  casacos:Number,
  calcas:Number,
  sapatos:Number,
  acessorios:Number,
  interior:Number,
  dinheiro:Number,
  approved:Boolean,
  points:Number,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);