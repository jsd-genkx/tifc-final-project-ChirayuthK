const mongoose = require("mongoose");

// Message model
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;