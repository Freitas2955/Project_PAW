var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donatorId:String,
  camisolas:String,
  casacos:String,
  calcas:Number,
  sapatos:Number,
  acessórios:Number,
  interior:Number,
  dinheiro:Number,
  approved:Boolean,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);