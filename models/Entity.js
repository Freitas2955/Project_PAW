var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
  name: String,
  description:String,
  address:String,
  city:String,
  postCode: String,
  email: String,
  password: String,
  phone: Number,
  updated_at: { type: Date, default: Date.now }
  //imagens ainda nao sei como guardar pq n e suposto ser na base de dados acho eu
});

module.exports = mongoose.model('Entity', EntitySchema);