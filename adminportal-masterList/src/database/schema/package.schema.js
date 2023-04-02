const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "name": {
        "type": String,
        "required": true,
        "unique": true
    },
    "options": {
        "type": Object,
    },
    "lane": {
        "type": String,
    },
    "games": {
        "type": String,
    },
    "cOn": {
        "type": Date,
        "default": Date.now()
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

const packageModel = mongoose.model("packagemodels", packageSchema);

module.exports = packageModel;