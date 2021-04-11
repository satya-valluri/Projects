/*
This represents the schema of each entry into the database file
i.e SQL - each row
in mongo - each document is represented by this model.

Always go by the fat models and thin controllers - business logic goes in the models
*/

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [
    //   true,
    //   "username field is mandatory, kindly enter it while creating a document",
    // ],
    //unique: true,
    default: "user1@carbon.com",
  },
  imageurl: {
    type: String,
    default: "www.images.carbon.com",
  },
  timestamp: {
    type: Date,
    required: [true, "Timestamp missing in ImageSchema document"],
  },
  sha256: {
    type: String,
    required: [true, "sha256 missing in ImageSchema document"],
    unique: true,
  },
});

const ImageModel = mongoose.model("ImageModel", imageSchema);
//this string is going to be the 'tablename' i.e the 'collectionName'

module.exports = ImageModel;
