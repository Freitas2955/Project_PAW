var mongoose = require('mongoose');

var DonatorSchema = new mongoose.Schema({
  name: String,
  address:String,
  points:Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donator', DonatorSchema);