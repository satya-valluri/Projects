var express = require("express");
var loginRouter = express.Router();
const glib = require("../../lib/googleAuthWrapper/googleAuthWrapperLib");

loginRouter.post("/", (req, res) => {
  let { tokenId: idToken } = req.body; //Object Destructering
  glib
    .getOAUthClient()
    .verifyIdToken({ idToken, audience: glib.getMyClientID() })
    .then((loginTicket) => {
      let { email, family_name } = loginTicket.payload;
      console.log(`User Verified with Google : ${family_name} - ${email}`);
      res.send(`User Verfied with EMAIL IN Server: ${email}`); // lets send the email to client.
    })
    .catch((err) => {
      console.log("Error in verifyIdToken");
    });
});

module.exports = loginRouter;
