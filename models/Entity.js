var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
  name: String,
  description:String,
  address:String,
  updated_at: { type: Date, default: Date.now }
  //imagens ainda nao sei como guardar pq n e suposto ser na base de dados acho eu
});

module.exports = mongoose.model('Entity', EntitySchema);