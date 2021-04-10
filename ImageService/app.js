const express = require("express");
const mongoose = require("mongoose");
const imageRouter = require("./routes/imageRoutes");
const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://satya:welcome123%23@cluster0.ury8f.mongodb.net/imagedb?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
//   )
//   .then(
//     (con) => console.log("\n\t\tDB connection successful"),
//     (reason) => console.log(`\n\t\tDB connection successful : \n ${reason}`)
//   );

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/images", imageRouter);
const port = 3000;
app.listen(port, () => console.log(`App running on port : ${port}`));
