var mongoose = require("mongoose");

var PartnerSchema = new mongoose.Schema({
  name: String,
  description: String,
  cost: Number,
  partnerId: String,
  partnerName: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
