var mongoose = require("mongoose");

var CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  partnerId: {
    type: String,
    required: true
  },
  partnerName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Campaign", CampaignSchema);
