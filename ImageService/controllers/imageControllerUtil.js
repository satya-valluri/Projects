const crypto = require("crypto");
const fs = require("fs");
const sharp = require("sharp");
const { readdir } = require("fs/promises");

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

const asyncGetFullFileName = async (path) => {
  try {
    const files = await readdir(path);
    for await (const file of files) return file;
  } catch (err) {
    console.error(`  ERROR in the async call readdir \t : \t ${err}`);
  }
};

const createHash = (fullFilename) => {
  return new Promise((resolve, reject) => {
    var shasum = crypto.createHash("sha256");
    var fileStream = fs.ReadStream(fullFilename);
    fileStream.on("data", (data) => {
      // updating shasum with the file content
      shasum.update(data);
    });
    fileStream.on("end", () => {
      var hash = shasum.digest("hex");
      resolve(hash); //TODO : What if this fails - need to read the api
      // check for a mongo db object with this entry : using mongodb.find
    }); // making the digest
  });
};
const resizeImage = async (isProfile, imgDirectory, srcFileName) => {
  try {
    let srcFileNamebs = srcFileName.split("\\").join("\\\\"); // convert \ to \\ in the path
    const imageDirectorybs = imgDirectory.split("\\").join("\\\\");
    let desFileNamebs = imageDirectorybs.concat(
      "\\\\",
      isProfile === "true" ? "profileImage.png" : "postimage.png"
    );
    console.log(srcFileNamebs);
    console.log(desFileNamebs);

    const imgRes = await sharp(srcFileNamebs)
      .resize(128, 128, { fit: "contain" }) // 'contain' zooms out the image - blurred effect
      .toFile(desFileNamebs);
    return imgRes;
  } catch (err) {
    console.log(`CHECK 4 . FAILED TO resiz image : ${err}`);
    throw new Error(`CHECK 4 . FAILED TO resiz image : ${JSON.stringify(err)}`);
  }
};

module.exports = {
  asyncGetFullFileName,
  isImage,
  createHash,
  resizeImage,
};
