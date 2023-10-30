const User = require("../models/user");

const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const existingUser = User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.addresses.push(address);

    await existingUser.save();

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingUser = User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(existingUser.addresses);
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
};

module.exports = { addAddress, getAddress };
