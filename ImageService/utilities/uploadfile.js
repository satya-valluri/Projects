const multer = require("multer");
const ImageModel = require("../models/imageModel");

// TO DYNAMICALLY DECIDE THE STORAGE PATH AND FILENAME CREATE A WRAPPER
// AROUND THE BELOW CODE AND CALL IT EVERYTIME YOU GET AN UPLOAD IMAGE REQUEST

// AT THE MOMENT ALL FILES WILL BE STORED IN THE ./images FOLDER.
// PROCESSED FILES WILL BE STORED IN THE 'TOCLOUDIMAGES' SUBFOLDER
// - AND THE ORIGINAL CONTENT WILL HAVE TO BE DELETE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("file");

module.exports = upload;
