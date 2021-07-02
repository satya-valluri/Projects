const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./init/mongoInit");
connectToMongoDB();

var app = express();
const { registerUser } = require("./routes/registerUser");
const { loginUser } = require("./routes/loginUser");
const { listItems } = require("./routes/Items");
//const { userCheck } = require("../middleware/userCheck");

app.use(express.json());
app.use(cors());

app.use("/register", registerUser);
app.use("/login", loginUser);
app.use("/items", listItems);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
