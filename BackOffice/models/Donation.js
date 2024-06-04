var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  entityId: {
    type: String,
    required: true
  },
  entityName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  donatorId: {
    type: String,
    required: true
  },
  donatorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  camisolas: {
    type: Number,
    default: 0,
    min: 0
  },
  casacos: {
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
  acessorios: {
    type: Number,
    default: 0,
    min: 0
  },
  interior: {
    type: Number,
    default: 0,
    min: 0
  },
  dinheiro: {
    type: Number,
    default: 0,
    min: 0
  },
  approved: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Donation', DonationSchema);