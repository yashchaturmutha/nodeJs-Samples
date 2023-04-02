const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const userSchema = new mongoose.Schema({
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
        "default": "user"
    },
    "package": {
        "type": String,
        "enum": ['deluxe', 'super'],
    },
    "title": {
        "type": String,
        "required": [true, 'title required'],
    },
    "password": {
        "type": String,
        required: true
    },
    "cOn": {
        "type": Date,
        "default": Date.now()
    },
    "image": {
        "data": Buffer,
        "contentType": String,
    },
    "expOn": {
        "type": Date,
        // required: [true, 'expiry date required']
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

const userModel = mongoose.model("usermodels", userSchema);

module.exports = userModel;