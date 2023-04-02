const mongoose = require('mongoose');
// superAdmin will be created directly in DB
const superAdminSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  identity: {
    type: String,
    required: [true, 'email required'],
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'delete'],
  },
  password: {
    type: String,
    required: true,
  },
  cOn: {
    type: Date,
    default: Date.now(),
  },
  cBy: {
    type: String,
    default: 'cadis',
  },
  mBy: {
    type: String,
  },
  mOn: {
    type: Date,
    default: Date.now(),
  },
});

const superAdminModel = mongoose.model('superAdminModel', superAdminSchema);

module.exports = superAdminModel;
