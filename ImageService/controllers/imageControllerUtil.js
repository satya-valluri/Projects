const crypto = require("crypto");
const fs = require("fs");
const sharp = require("sharp");
const { readdir, rm } = require("fs/promises");
const path = require("path");

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
    // we know that there will be only one file so returning
  } catch (err) {
    console.error(`  ERROR in the async call readdir \t : \t ${err}`);
  }
};

const cleanFiles = async (folderName) => {
  try {
    const files = await readdir("C:\\Users\\invasat\\Desktop\\dhKr\\images");
    //const files = await readdir(`${imageDirectorybs}`);
    for await (const file of files) {
      const fullfileName = `C:\\Users\\invasat\\Desktop\\dhKr\\images\\${file}`;
      console.log(`removing file ${fullfileName}`);
      const res = await fs.unlink(fullfileName, (err) => {
        if (err) throw err;
        console.log(`File deleted successfully : ${fullfileName}`);
      });
    }
    return true;
  } catch (err) {
    console.log("error while cleaning files");
    console.log(err);
    throw err;
  }

  // const res = await rm("C:\\Users\\invasat\\Desktop\\test\\images\\photo.png", {
  //   force: true,
  // });
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
  cleanFiles,
};
