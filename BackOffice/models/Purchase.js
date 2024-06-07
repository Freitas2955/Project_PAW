var mongoose = require("mongoose");

var PurchaseSchema = new mongoose.Schema({
  donatorName: {
    type: String,
    required: true,
  },
  donatorId: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  campaignId: {
    type: String,
    required: true
  },
  campaignName: {
    type: String,
    required: true
  },
  partnerId: {
    type: String,
    required: true
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
