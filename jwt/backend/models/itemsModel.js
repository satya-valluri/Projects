const mongoose = require("mongoose"); // object
const { Schema } = mongoose; // object destructuring

const itemSchema = new Schema({
  email: String,
  items: [String],
});

exports.itemModel = mongoose.model("items", itemSchema); // calling a function in the mongoose object
