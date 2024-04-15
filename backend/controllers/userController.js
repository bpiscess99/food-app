const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
// const client = new OAuth2Client({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_SECRET_KEY
// });

// console.log("ClientID:", client.clientId)
// console.log("ClientSecret:", client.clientSecret)

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, location } = req.body;

  //   validation
  if (!name || !email || !password || !location) {
    res.status(400);
    throw new Error("Please fill all required field");
  }

  // Check if email is already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User email already exist");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    location,
  });

  // Generate a Token

  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, location } = user;
    res.status(201).json({
      _id,
      name,
      email,
      location,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// loginUser

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);

    throw new Error("Please fill all required field");
  }

  // Check if user is exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(200);
    throw new Error("User not found please sign up");
  }

  // check password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Password Validation

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Generate a token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, email, password, location } = user;
    res.status(200).json({
      _id,
      name,
      email,
      password,
      location,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email } = user;
    res.status(200).json({
      _id,
      name,
      email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//   Login With Google
const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { name, email, sub } = payload;
  const password = Date.now() + sub;

  // Check if user exist
  const user = await User.findOne({ email });

  if (!user) {
    // create new user
    const newUser = await User.create({
      name,
      email,
      password,
      location,
    });

    // Generate a Token

    if (newUser) {
      const token = generateToken(user._id);

      // Send HTTP-only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });

      const { _id, name, email, location } = newUser;
      res.status(201).json({
        _id,
        name,
        email,
        location,
        token, 
      });
    }
  }

  // If user exists, login
  if (user) {
    const token = generateToken(user._id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, location } = user;
    res.status(201).json({
      _id,
      name,
      email,
      location,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  loginWithGoogle,
};
