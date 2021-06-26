const express = require("express");
var cors = require("cors");
const app = express(); // Express returning an Object from that module
const { OAuth2Client } = require("google-auth-library");
let clientId =
  "393444161581-866s6mmqcc0jq5sgmrj215b2rs5qf8d2.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

app.use(cors());
app.use(express.json()); // This adds the 'body' key to the request object received from client

app.get("/", (req, res) => {
  res.send("Request for Home Page received in server");
});

app.post("/login", (req, res) => {
  let { tokenId } = req.body;
  //console.log(tokenId);
  client
    .verifyIdToken({ idToken: tokenId, audience: clientId })
    .then((loginTicket) => {
      let { email, family_name } = loginTicket.payload;
      console.log(`User Verified with Google : ${family_name} - ${email}`);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(tokenId);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
