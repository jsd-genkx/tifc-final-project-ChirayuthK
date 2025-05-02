const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middleware/auth");

// User registration route
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); // เพิ่ม
    res.status(500).send("Error registering user");
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User not found");

    if (req.body.password !== user.password)
      return res.status(401).send("Invalid password");

    const token = jwt.sign({ _id: user._id, role: user.role }, secretKey);
    res.json({ token });
  } catch (err) {
    res.status(401).send("Error logging in");
  }
});

module.exports = router;
