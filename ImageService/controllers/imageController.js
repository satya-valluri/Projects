/*
This is the place i.e the controller where we are going to create delete update images.
But first we need the Tour Model
*/
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const upload = require("../utilities/uploadfile");
const {
  asyncGetFullFileName,
  isImage,
  createHash,
  resizeImage,
  cleanFiles,
} = require("./imageControllerUtil");

const ImageModel = require("../models/imageModel");
const imgDirectory = path.join(__dirname, "../images");

// ALternatively we can invoke a nodejs serverless function in cloud (via an API Gateway)
// - which support a lot of metrics and logging functionality inbuilt.
// The client using the cloud SDK will have to upload the image only once to the cloud directly
// - and perform other checks there

const postImage = async (req, res) => {
  // TODO :
  // ----- Ensure the presence of the directory images
  // ----- Cleanup : Delete all files but not folders in the rootdir/images folder
  // ----- upon Errors we need to return an appropriate message at every stage
  // The reason we are removing old files is that we are not fetching the received file name from multer.
  // we probably have to figure out a way to get it from req object
  const imgDirectory1 = path.join(__dirname, `..\\images}`);
  const fresult = await cleanFiles(imgDirectory1);
  console.log(`deleted files : ${fresult}`);

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

      try {
        // Step 0 . Get the profile picture full path
        const imgDirectory = path.join(__dirname, "..\\images");
        let fullFilename = "";
        const fileName = await asyncGetFullFileName(imgDirectory);
        fullFilename = imgDirectory.concat("\\", fileName);

        // Step 1 . Check if the file is an image
        const isImageRes = await isImage(fullFilename);
        isImageRes === true
          ? console.log(`CHECK 1 : ${fullFilename} is an Image  \n`) // proceed in this case
          : console.log(`CHECK 1 : ${fullFilename} is an NOT Image\n`); // **RETURN** an error with appropriate body

        // Step 2 . Check if the file size is less than 5MB
        const size = fs.statSync(fullFilename).size; // we get the result in bytes
        if ((size > 5, 253, 120))
          console.log(`CHECK 2 : Image is LESS than 5MB : ${size}\n`);
        else console.log(`CHECK 2 : Image is GREATER than 5MB\n`);

        // Step 3 . Create sha256 and query DB if the image is already been uploaded
        const hash = await createHash(fullFilename);
        console.log(`CHECK 3 : The hash is \t ${hash}\n`);

        // Step 4 . Check for unacceptable content in the image
        //TODO : Install the needed Cloud SDK + make the call to get an output
        console.log(
          `CHECK 4 : IGNORE DUPLICATE MESSAGE : Check for unacceptable content from azure cloud provider `
        );

        // Step 5 . Profile Image (or) Post Image + store to subfolder "tocloudimages"
        const reply = await resizeImage(
          req.params.isProfile,
          imgDirectory,
          fullFilename
        );
        console.log(
          `CHECK 5 . Successfully resized image : ${JSON.stringify(reply)}`
          // {"format":"png","width":128,"height":128,"channels":4,"premultiplied":true,"size":3665}
        );

        // Step 6 . Store the information in the database
        // {username,imageurl,timestamp,sha256}
        try {
          let un =
            "user" +
            Math.round(Math.random() * 1000).toString() +
            "@carbon.com";
          const docEntry = await ImageModel.create({
            username: un,
            timestamp: new Date(),
            sha256: hash,
          });
          console.log(
            `CHECK 6 . Successfully Stored the Below Document in MONGO DB ATLAS \n: ${JSON.stringify(
              docEntry
            )} \n`
          );
        } catch (err) {
          console.log(`\n\n BELOW ERROR OCCURED WHILE STORING \n\n`);
          console.log(err);
          //TODO : SEND appropriate http error code - TO CLIENT OR PARTIAL SUCCESS CODE AS WE JUST DID NOT STORE THE IMAGE AGAIN.
        }

        // Step 7 . Finally send the image url + success code + stored document id - back to client
        res.status(201).send({
          status: "success",
          data: {
            imagesurl: "Responding to POST : Successfully Added Image",
          },
        });
      } catch (err) {
        console.log(`\n\nERROR\n\n`);
        console.log(`ERROR OCCURED WHILE IMAGE VERIFICATION : ${err}`);
      }
    }
  });
};

module.exports = postImage;
