const express = require("express");
var cors = require("cors");
const app = express(); // Express returning an Object from that module

app.use(cors());
app.use(express.json()); // This adds the 'body' key to the request object received from client

app.get("/", (req, res) => {
  res.send("Request for Home Page received in server");
});

app.post("/login", (req, res) => {
  let { tokenId } = req.body;
  console.log(tokenId);
  res.send(tokenId);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
