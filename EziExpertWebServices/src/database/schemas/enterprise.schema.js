const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  eName: {
    type: String,
  },
  identity: {
    type: String,
    // "required": [true, 'email required'],
    // "unique": true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'delete'],
  },
  // "password": {
  //     "type": String,
  //     required: true
  // },
  cOn: {
    type: Date,
    default: Date.now(),
  },
  cBy: {
    type: String,
    default: 'superadmin',
  },
  mBy: {
    type: String,
  },
  mOn: {
    type: Date,
    default: Date.now(),
  },
});

const enterpriseModel = mongoose.model('enterpriseModel', enterpriseSchema);

module.exports = enterpriseModel;
