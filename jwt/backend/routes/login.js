const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/user");
const { jwtSecret } = require("../config/default.json");
const jwt = require("jsonwebtoken");

function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

router.post("/", async function (req, res) {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      // should you return here??
      msg: "Please enter all feilds",
    });
  }

  try {
    let userInDb = await User.findOne({ email });

    if (userInDb) {
      //existing user
      return res.status(400).json({
        msg: "user already exists",
        email: email,
      });
    } else {
      let newUser = new User({
        name: name,
        password: password,
        email: email,
      });
      let savedUser = await newUser.save();
      console.log(savedUser);
      let token = await signToken({ id: savedUser._id }); // if failed delete user
      console.log(token);
      if (savedUser) {
        return res.send({
          msg: "Successfully saved user",
          ...savedUser,
          token,
        });
      } else {
        return res.status(500).json({ msg: "Failed to Login", email });
      }
    }
  } catch (error) {
    console.log(`Failure to Register User with Email : ${email}`);
  }
});

module.exports.loginRouter = router;

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
