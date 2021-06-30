const express = require("express");
var cors = require("cors");
const app = express();

let foo = require("./routes/login/home");
console.log(foo);
const loginRouter = require("./routes/login/login");

app.use(cors());
app.use(express.json());
//Calling the Static Method json : adds the 'body' key to the request object received from client

//Method -1 of using Routing for Home Page
app
  .route("/")
  .get(function (req, res) {
    res.send("Home Page : Get Served ");
  })
  .post(function (req, res) {
    res.send("Home Page : Post Served");
  })
  .put(function (req, res) {
    res.send("Home Page Update Served");
  });

//Method -2 of using Routing for Login
app.use("/login", loginRouter);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
