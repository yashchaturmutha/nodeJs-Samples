const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  meetingId: {
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
  rating: {
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

const ratingModel = mongoose.model('ratingModel', ratingSchema);

module.exports = ratingModel;
