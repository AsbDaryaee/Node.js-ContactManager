const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/users");
const tokenValidator = require("../middlewares/tokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", tokenValidator ,currentUser);

module.exports = router;
