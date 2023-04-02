const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "identity": {
        "type": String,
        "required": [true, 'email required'],
        "unique": true
    },
    "role": {
        "type": String,
        "enum": ['admin', 'superadmin', 'distributor', 'user'],
    },
    "uniqueCode": {
        "type": String,
    },
    "status": {
        "type": String,
        "enum": ['active', 'inactive', 'delete'],
    },
    "isLogged": {
        "type": Boolean
    },
    "password": {
        "type": String,
        required: true
    },
    "imageUrl": {
        "type": String
    },
    "expOn": {
        "type": Date,
    },
    "title": {
        "type": String,
    },
    "totalCount": {
        "type": String
    },
    "availableCount": {
        "type": String
    },
    "availableLane": {
        "type": Array,
    },
    "package": {
        "type": String,
        // "enum": ['deluxe', 'super'],
    },
    "region": {
        "type": String,
    },
    "analytics": {
        "type": Object
    },
    "cOn": {
        "type": Date,
    },
    "cBy": {
        "type": String,
    },
    "mBy": {
        "type": String,
    },
    "mOn": {
        "type": Date,
        "default": Date.now()
    },
}
);

const adminModel = mongoose.model("adminmodels", adminSchema);

module.exports = adminModel;