const jwt = require("jsonwebtoken");
const { key } = require("../config/jwt_config.js");
const userDetails = require("../models/User.js");
const sc = require("../config/status_code.js");

const JWTVerification = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .send({
        statuscode: sc.Unauthorized.code,
        message: sc.Unauthorized.message,
        data: "Token is missing in header",
      });
  }

  jwt.verify(token, key, async (error, user) => {
    if (error) {
      console.log(error);
      return res
        .status(498)
        .send({
          statuscode: sc.Invalid.code,
          message: sc.Invalid.message,
          data: "invalid token or token expired!",
          error: error,
        });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = JWTVerification;
