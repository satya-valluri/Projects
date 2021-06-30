const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
  console.log("login request received");
  //res.status(200).json({ msg: "received login request" });
  res.send({ msg: "received login request" });
});

module.exports.loginRouter = router;
