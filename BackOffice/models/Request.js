var mongoose = require("mongoose");

var Requestchema = new mongoose.Schema({
  donatorName: String,
  donationId: String,
  address: String,
  postCode: String,
  done: Boolean,
  city: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", Requestchema);
