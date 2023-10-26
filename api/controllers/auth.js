const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");
const { sendVerificationEmail, generateSecretKey } = require("../helpers");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Could not register new user" });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.params.token;

    const existingUser = await User.findOne({ verificationToken: token });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    existingUser.verified = true;
    existingUser.verificationToken = undefined;

    await existingUser.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Could not verify user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secretKey = generateSecretKey();

    const token = jwt.sign({ userId: existingUser._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Could not login user" });
  }
};

module.exports = {
  register,
  verifyToken,
  login,
};
