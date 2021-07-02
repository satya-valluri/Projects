const mongoose = require("mongoose"); // returns a mongoose object
const { Schema } = mongoose; // destructure the obj for the Schema variable which is a function

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

exports.userModel = mongoose.model("users", userSchema);
//users : Table / colelction
