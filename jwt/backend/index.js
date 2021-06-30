const express = require("express");
const cors = require("cors");

var app = express();
const { loginRouter } = require("./routes/login");

app.use(cors);
app.use("/login", loginRouter);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
