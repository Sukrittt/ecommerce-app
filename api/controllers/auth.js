const User = require("../models/user");
const { sendVerificationEmail } = require("../helpers");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });

    newUser.verificationToken = crypto.randomUUID(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);
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

    await existingUser.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Could not verify user" });
  }
};

module.exports = {
  register,
  verifyToken,
};