var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donatorId:String,
  type:String,
  ammount:Number,
  collected:Boolean,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);