const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/userModel");
const { signToken } = require("../common/jwtUtil");

router.post("/", async function (req, res) {
  let { email, password } = req.body;
  //Validate input
  if (!email || !password) {
    return res.send({
      code: 400,
      msg: "Error : Please enter all feilds",
    });
  }

  try {
    let existingUser = await User.findOne({ email }); // Find user
    if (existingUser && existingUser.password === password) {
      // Is it correct password ?
      let token = await signToken({ id: existingUser._id });
      return res.send({
        code: 200,
        msg: "Successfully logged in",
        token,
      });
    } else {
      return res.send({
        code: 400,
        msg: "Please Register User to Login",
      });
    }
  } catch (error) {
    return res.send({
      code: 400,
      msg: "Exception : Unexpected error has occured while Login User",
    });
  }
});
module.exports.loginUser = router;
