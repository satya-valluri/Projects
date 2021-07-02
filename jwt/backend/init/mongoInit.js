const mongoose = require("mongoose");
//const { mongouri } = require("../config/keys");
//const config = require("../config/default.json");
const { mongouri } = require("../config/default.json");

// Will the import module wait till this is done : NO
// Should you use top level await - YES : ES2021
exports.connectToMongoDB = function () {
  mongoose
    .connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(
      () => {
        console.log("Connected to Mongo DB");
      },
      (err) => {
        console.log("Failed to connect to Mongo DB : ERROR Code below /n/n/n");
        console.log(err);
      }
    );
};

// mongoose.connection.once("open", function () {
//   console.log("successfully connected to database");
// });
// mongoose.connection.on("error", function (err) {
//   console.log(err);
// });
