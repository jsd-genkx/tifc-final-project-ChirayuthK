const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const { authenticateToken, secretKey } = require("./api/middleware/auth.js");
const dotenv = require ("dotenv");
const messageRoutes = require("./api/routes/messages");
const userRoutes = require("./api/routes/users");

// Middleware to parse JSON bodies
app.use(express.json());
dotenv.config();

// MongoDB connection configuration
(async () => {
  // Connect to MongoDB via Mongoose
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo database");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
})();

app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("Server is running...");
});
