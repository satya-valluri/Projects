/*
This is the place i.e the controller where we are going to create delete update images.
But first we need the Tour Model
*/
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
//const { readdir } = require("fs/promises");
const upload = require("../utilities/uploadfile");
const {
  asyncGetFullFileName,
  isImage,
  createHash,
  resizeImage,
} = require("./imageControllerUtil");

const ImageModel = require("../models/imageModel");
const imgDirectory = path.join(__dirname, "../images");

const postImage = (req, res) => {
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
      try {
        // Step 1 . Get the profile picture full path
        const imgDirectory = path.join(__dirname, "..\\images");
        let fullFilename = "";
        const fileName = await asyncGetFullFileName(imgDirectory);
        fullFilename = imgDirectory.concat("\\", fileName);

        // Step 2 . Check if the file is an image
        const isImageRes = await isImage(fullFilename);
        isImageRes === true
          ? console.log(`CHECK 1 : ${fullFilename} is an Image  \n`) // proceed in this case
          : console.log(`CHECK 1 : ${fullFilename} is an NOT Image\n`); // **RETURN** an error with appropriate body

        // Step 3 . Check if the file size is less than 5MB
        const size = fs.statSync(fullFilename).size; // we get the result in bytes
        if ((size > 5, 253, 120))
          console.log(`CHECK 2 : Image is LESS than 5MB : ${size}\n`);
        else console.log(`CHECK 2 : Image is GREATER than 5MB\n`);

        // Step 4 . Create sha256 and query DB if the image is already been uploaded
        const hash = await createHash(fullFilename);
        console.log(`CHECK 3 : The hash is \t ${hash}\n`);

        // Step 5 . Check for unacceptable content in the image
        //TODO : Install the needed Cloud SDK + make the call to get an output

        // Step 6 . Profile Image (or) Post Image + store to subfolder "tocloudimages"
        const reply = await resizeImage(
          req.params.isProfile,
          imgDirectory,
          fullFilename
        );
        console.log(
          `CHECK 4 . Successfully resized image : ${JSON.stringify(reply)}`
          // {"format":"png","width":128,"height":128,"channels":4,"premultiplied":true,"size":3665}
        );

        // Step 6 . Store the information in the database
        // Add 'imageurl',username,imagesha256hash,timestamp to mongodb database

        // Step 7 . Finally send the image url + success code back to client
        res.status(201).send({
          status: "success",
          data: {
            imagesurl: "Responding to POST : Successfully Added Image",
          },
        });
      } catch (err) {
        console.log(`ERROR OCCURED WHILE IMAGE VERIFICATION : ${err}`);
      }
    }
  });
};

module.exports = postImage;
