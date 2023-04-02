const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  bandwidthUsage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'delete'],
  },
  assistant: {
    type: String,
  },
  consultant: {
    type: String,
  },
  assistantIP: {
    type: String,
  },
  duration: {
    type: String,
  },
  cOn: {
    type: Date,
    default: Date.now(),
  },
  cBy: {
    type: String,
  },
});

const sessionModel = mongoose.model('sessionModel', sessionSchema);

module.exports = sessionModel;
