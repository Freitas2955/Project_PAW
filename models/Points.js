var mongoose = require('mongoose');

var PointsSchema = new mongoose.Schema({
  camisola:Number,
  acessorios:Number,
  casaco:Number,
  calcas:Number,
  sapatos:Number,
  roupainterior:Number,
  dinheiro:Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Point', PointsSchema);