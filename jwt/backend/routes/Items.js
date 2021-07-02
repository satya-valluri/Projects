const express = require("express");
const router = express.Router();
const { userCheck } = require("../middleware/userCheck");
const { userModel } = require("../models/userModel");
const { itemModel } = require("../models/itemsModel");

router.get("/", userCheck, async function (req, res, next) {
  let dbUser = await userModel.findOne({ _id: req.user.id });
  let dbItem = await itemModel.findOne({ email: dbUser.email });

  return res.send({
    code: 200,
    msg: "got the items for user",
    email: dbUser.email,
    items: dbItem.items,
  });
});

router.post("/", userCheck, async function (req, res, next) {
  let dbUser = await userModel.findOne({ _id: req.user.id });
  let dbItems = await itemModel.findOne({ email: dbUser.email }); //find items for this user

  if (dbItems) {
    //if document exists
    if (dbItems?.items?.includes(req.body.item)) {
      console.log("item already exists");
      return res.send({
        code: 200,
        msg: "Already Item Exists",
        item: req.body.item,
      });
    }

    let savedItem = await itemModel.findOneAndUpdate(
      { email: dbUser.email },
      { $push: { items: { $each: [req.body.item] } } },
      { new: true }
    );
    if (savedItem) {
      return res.send({
        code: 200,
        msg: "Successfully Saved Item",
        items: savedItem.items,
      });
    } else {
      console.log("failed to save item");
    }
  } else {
    // else just create a new object and include the items
    let newItem = new itemModel({
      email: dbUser.email,
      items: [req.body.item],
    });
    let savedItem = await newItem.save();
    if (savedItem) {
      return res.send({
        code: 200,
        msg: "Successfully Saved Item",
        email: savedItem.email,
        items: savedItem.items,
      });
    }
  }

  return res.send({
    code: 200,
    msg: "got the items for user",
    email: dbUser.email,
    item: req.body.item,
  });
});
exports.listItems = router;
