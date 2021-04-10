const express = require("express");
const postImage = require("../controllers/imageController");

const router = express.Router();

router.route("/:isProfile").post(postImage);
module.exports = router;
