var mongoose = require('mongoose');

var PointsSchema = new mongoose.Schema({
camisola: {
    type: Number,
    default: 0,
    min: 0
  },
  acessorios: {
    type: Number,
    default: 0,
    min: 0
  },
  casaco: {
    type: Number,
    default: 0,
    min: 0
  },
  calcas: {
    type: Number,
    default: 0,
    min: 0
  },
  sapatos: {
    type: Number,
    default: 0,
    min: 0
  },
  roupainterior: {
    type: Number,
    default: 0,
    min: 0
  },
  dinheiro: {
    type: Number,
    default: 0,
    min: 0
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Point', PointsSchema);