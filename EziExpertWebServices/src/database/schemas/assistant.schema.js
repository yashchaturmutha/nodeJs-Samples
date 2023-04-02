const mongoose = require('mongoose');

// QR code will be generated and sent to assistant for login

const assistantSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  aName: {
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
  },
  role: {
    type: String,
    Default: 'assistant',
  },
  type: {
    type: String,
    Default: 'N',
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

const assistantModel = mongoose.model('assistantmodels', assistantSchema);

module.exports = assistantModel;
