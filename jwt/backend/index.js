const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./init/mongoInit");
connectToMongoDB();

var app = express();
const { loginRouter } = require("./routes/login");
app.use(express.json());
app.use(cors());

app.use("/login", loginRouter);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
