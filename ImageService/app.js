const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port : ${port}`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

const postImage = (req, res) => {
  console.log("received image");
  //get the image
  upload(req, res, (err) => {
    if (err) {
      console.log("some error occured");
      return res.status(404).json({
        status: "failed",
        data: {
          message: "Failed to upload image",
          errorcode: "404",
        },
      });
    } else {
      res.status(201).send({
        status: "success",
        data: {
          imagesurl: "Responding to POST : Successfully Added Image",
        },
      });
    }
  });

  //if (req.params.isProfile === 'true') then resize the image appropriately

  // is Image + check size + create SHA256 and query db + Check for unacceptable content

  //   if (false) {
  //     return res.status(404).json({
  //       status: "failed",
  //       data: {
  //         message: "Failed to upload image",
  //         errorcode: "404",
  //       },
  //     });
  //   }
  //   res.status(201).send({
  //     status: "success",
  //     data: {
  //       imagesurl: "Responding to POST : Successfully Added Image",
  //     },
  //   });
};

//app.post("/images/:isProfile", postImage);
//app.route("/images/:isProfile").post(postImage).get(getAllImages) - chaining can be done
app.route("/images/:isProfile").post(postImage);
