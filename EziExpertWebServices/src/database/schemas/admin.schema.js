const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  admName: {
    type: String,
    // "required": true,
  },
  orgName: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  identity: {
    type: String,
    // "required": [true, 'email required'],
    // "unique": true
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  enterpriseName: {
    type: String,
  },
  role: {
    type: String,
    Default: 'admin',
  },
  phone: {
    type: Number,
  },
  optionalPhone: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'delete'],
  },
  cOn: {
    type: Date,
  },
  cBy: {
    type: String,
  },
  mBy: {
    type: String,
  },
  mOn: {
    type: Date,
    default: Date.now(),
  },
});

const adminModel = mongoose.model('adminmodels', adminSchema);

module.exports = adminModel;
