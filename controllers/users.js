const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/usersModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Provide Username, Email and Password To Register");
  }

  const userCheck = await User.findOne({ email: email });
  if (userCheck) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    username: username,
    email: email,
    password: hashPassword,
  });

  console.log("A User Has Been Created");

  res.status(201).json({
    Status: "Succssesful",
    username: createUser.username,
    email: createUser.email,
    id: createUser.id,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Provide Email and Password to Login");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(403);
    throw new Error("The User Does not Exist");
  }

  const hashPassword = await bcrypt.compare(password, user.password);

  if (user && hashPassword) {
    const AccessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ Status: "Succssesful", AccessToken: AccessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not Valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
