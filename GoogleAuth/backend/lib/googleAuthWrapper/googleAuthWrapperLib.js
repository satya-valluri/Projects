const { OAuth2Client } = require("google-auth-library");

function getMyClientID() {
  return "393444161581-866s6mmqcc0jq5sgmrj215b2rs5qf8d2.apps.googleusercontent.com";
}

function getOAuth2ClientFromClientID(clientID) {
  return new OAuth2Client(clientID);
}
function getOAUthClient() {
  return getOAuth2ClientFromClientID(getMyClientID());
}

exports.getOAuth2ClientFromClientID = getOAuth2ClientFromClientID;
exports.getMyClientID = getMyClientID;
exports.getOAUthClient = getOAUthClient;

// module.exports = {
//   getMyClientID,
//   getOAuth2ClientFromClientID,
// };
