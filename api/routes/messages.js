const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const Message = require("../models/message");
const User = require("../models/user");
const router = express.Router();

// Get all messages with authentication and user details
router.get("/", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().populate("user", "username");
    res.json(messages);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Create a new message with authentication
router.post("/", authenticateToken, async (req, res) => {
  if (!req.body.text || !req.body.user_id) {
    return res.status(400).send("Text and user ID are required");
  }

  try {
    const user = await User.findById(req.body.user_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const message = new Message({
      text: req.body.text,
      user: req.body.user_id,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Get a specific message by ID with authentication
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.json(message);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Update a message by ID with authentication
router.put("/:id", authenticateToken, async (req, res) => {
  if (!req.body.text) {
    return res.status(400).send("Text is required");
  }

  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send("Message not found");
    }

    message.text = req.body.text;
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Delete a message by ID with authentication
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    await message.deleteOne({ _id: req.params.id});
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

module.exports = router;
