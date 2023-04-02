const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  consName: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: [true, 'email required'],
    unique: true,
  },
  enterpriseName: {
    type: 'String',
    required: true,
  },
  password: {
    type: 'String',
    required: true,
  },
  speciality: { // will be unique or array of speciality
    type: 'String',
  },
  timings: { // will be unique or array of timings
    type: 'String',
  },
  role: {
    type: String,
    Default: 'consultant',
  },
  type: {
    type: String,
    Default: 'Y',
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
    default: Date.now(),
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

const consultantModel = mongoose.model('consultantmodels', consultantSchema);

module.exports = consultantModel;
