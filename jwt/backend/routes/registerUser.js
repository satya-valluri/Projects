const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/userModel");
const { signToken } = require("../common/jwtUtil");

router.post("/", async function (req, res) {
  let { name, email, password } = req.body;

  //check for input : must do this in the model - fat model and thin controller concept
  if (!name || !email || !password) {
    return res.status(400).json({ code: 400, msg: "Please Enter all fields" });
  }

  try {
    let userInDb = await User.findOne({ email });

    if (userInDb) {
      return res
        .status(400)
        .json({ code: 400, msg: "Please Enter all fields", email });
    } else {
      //save new user - below
      let newUser = new User({
        name: name,
        password: password,
        email: email,
      });
      let savedUser = await newUser.save();
      //get a token with the payload as the id of the saved user
      let token = await signToken({ id: savedUser._id }); // if failed delete user
      console.log(token);
      // send response to client with token
      if (savedUser) {
        return res.send({
          code: 200,
          msg: "Successfully Registered user",
          email: savedUser.email,
          token,
        });
      } else {
        //return res.status(500).json({ msg: "Failed to Register User", email });
        return res.send({
          code: 500,
          msg: "Error : Failed to Register User",
          email: savedUser.email,
        });
      }
    }
  } catch (error) {
    //TODO : Delete user + Make an entry into debug logs
    return res.send({
      code: 500,
      msg: "Exception : Failed to Register User",
      email: savedUser.email,
    });
  }
});

module.exports.registerUser = router;

// Old way of storing objects
// newUser.save(function (err, obj) {
//   if (err) console.log("error saving user");
//   console.log(obj);
//   res.send({ obj });
// });

//  // try {
//   const obj = await newUser.save();
//   res.send({ msg: "Successfully saved user", ...obj });
// } catch (err) {
//   console.log("Failed to store user");
//   res.status(500).json({ msg: "failed to save user", email: newUser.email });
// }
