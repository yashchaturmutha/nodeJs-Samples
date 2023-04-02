const util = require("util");
const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
const {db, url, database, imgBucket} = require("../../database/db");

var storage = ""
// var storage = new GridFsStorage({
//     url: url + database,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg", "image/jpg"];
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-image-${file.originalname}`;
//             return filename;
//         }
//         return {
//             bucketName: imgBucket,
//             filename: `${Date.now()}-image-${file.originalname}`
//         };
//     }
// });
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;