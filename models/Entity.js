var mongoose = require("mongoose");

var EntitySchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  city: String,
  postCode: String,
  email: String,
  password: String,
  phone: Number,
  approved: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Entity", EntitySchema);