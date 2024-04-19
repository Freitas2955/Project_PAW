var mongoose = require("mongoose");

var DonationSchema = new mongoose.Schema({
  donationId: String,
  address: String,
  postCode: String,
  status: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", DonationSchema);
