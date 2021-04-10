/*
This represents the schema of each entry into the database file
*/

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [
      true,
      "username field is mandatory, kindly enter it while creating a document",
    ],
    unique: true,
  },
  imageurl: {
    type: String,
    default: "www.cloudprovider.com/storageservice/buckername/imagename.jpg",
  },
  timestamp: {
    type: Number,
    required: [true, "Timestamp of upload data is mandatory"],
  },
  sha256: String,
});

const ImageModel = mongoose.model("ImageModel", imageSchema);
//this string is going to be the 'tablename' i.e the 'collectionName'

module.exports = ImageModel;
