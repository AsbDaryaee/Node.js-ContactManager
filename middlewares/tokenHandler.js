const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const tokenValidator = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized");
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Please Login or Check Your Token");
  }
});

module.exports = tokenValidator;
