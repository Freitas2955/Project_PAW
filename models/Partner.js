var mongoose = require('mongoose');

var PartnerSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  address:String,
  postCode: String,
  city:String,
  description:String,
  email: String,
  password: String,
  updated_at: { type: Date, default: Date.now }
  //imagens ainda nao sei como guardar pq n e suposto ser na base de dados acho eu
});

module.exports = mongoose.model('Partner', PartnerSchema);