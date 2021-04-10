/*
This is the place i.e the controller where we are going to create delete update images.
But first we need the Tour Model
*/
const path = require("path");
const fs = require("fs");
const { readdir } = require("fs/promises");
const upload = require("../utilities/uploadfile");

const ImageModel = require("../models/imageModel");
const imgDirectory = path.join(__dirname, "../images");

const asyncGetFullFileName = async (path) => {
  try {
    const files = await readdir(path);
    for await (const file of files) return file;
  } catch (err) {
    console.error(`  ERROR in the async call readdir \t : \t ${err}`);
  }
};

const asyncIsImageFile = (fileName) => {
  return new Promise((resolve, reject) => {
    if (fileName.match(/.png|.jpeg|.jpg|.svg$/g) !== null) {
      resolve(true);
    } else resolve(false);
  });
};

const isImage = async (fname) => {
  const res = await asyncIsImageFile(fname);
  return res;
};

const postImage = (req, res) => {
  console.log("\n\t\t RECEIVED IMAGE FOR STORAGE");
  upload(req, res, async (err) => {
    if (err) {
      console.log("some error occured while downloading the file");
      return res.status(404).json({
        status: "failed",
        data: {
          message: "Failed to upload image",
          errorcode: "404",
        },
      });
    } else {
      // PERFORM EVERYTHING IN A NON BLOCKING WAY

      // TODO :  cleanup : delete all files but not folders in the rootdir/images folder
      //
      // Step 1 . Get the profile picture full path
      const imgDirectory = path.join(__dirname, "../images");
      let fullFilename = "";
      const fileName = await asyncGetFullFileName(imgDirectory);
      fullFilename = imgDirectory.concat("\\", fileName);

      // Step 2 . Check if the file is an image
      const isImageRes = await isImage(fullFilename);
      isImageRes === true
        ? console.log(`CHECK 1 : ${fullFilename} is an Image`) // proceed in this case
        : console.log(`${fullFilename} is an NOT Image`); // return an error with appropriate body

      // Step 3 . Check if the file size is less than 5MB
      const size = fs.statSync(fullFilename).size;
      if ((size > 5, 253, 120))
        console.log(`CHECK2 : Image is less than 5MB : ${size}`); // we get the result in bytes

      // Step 3 . Create sha256 and query DB if the image is already been uploaded
      // Step 4 . Check for unacceptable content in the image
      // Step 5 . Profile Image (or) Post Image + store to subfolder "tocloudimages"
      if (req.params.isProfile === "true") {
        // Use shape image library to change the size to 128*128 pixels
        // upload to cloud
      } else {
        // If it is a Post image resize to : 1200*1200 pixels
        // upload to cloud
      }

      // Step 6 . Store the information in the database
      // Add 'imageurl',username,imagesha256hash,timestamp to mongodb database

      // Step 7 . Finally send the image url + success code back to client
      res.status(201).send({
        status: "success",
        data: {
          imagesurl: "Responding to POST : Successfully Added Image",
        },
      });
    }
  });
};

module.exports = postImage;
