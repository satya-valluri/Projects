const jwt = require("jsonwebtoken");
const config = require("config");

function userCheck(req, res, next) {
  try {
    let token = req.header("x-auth-token");
    if (token) {
      req.user = jwt.verify(token, config.get("jwtSecret"));
      next();
    } else {
      return res.send({
        code: 401,
        msg: "Unauthorized! Please login to access Items",
      });
    }
  } catch (error) {
    return res.send({
      code: 500,
      msg: "Exception : Invalid Token",
    });
  }
}
exports.userCheck = userCheck;
