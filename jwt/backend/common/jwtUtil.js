const jwt = require("jsonwebtoken");
const config = require("config");

function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      function (err, token) {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

module.exports.signToken = signToken;
