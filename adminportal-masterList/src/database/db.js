const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/"
const database = "adminportal"
const imgBucket = "banners";

mongoose.set('debug', true)
mongoose.connect(
    url + database,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Mongo db Connection checked successfully");
});



module.exports = {
    db,
    url,
    database,
    imgBucket,
}

