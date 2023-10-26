const express = require("express");
const { addUser, getUserById } = require("./src/controllers/authController");
const app = express();
const db = require("./db");
const cors = require("cors");
const userRoutes = require("./src/routes/authRoutes");

async function startApp() {
  try {
    await db;

    app.use(cors());

    // Middleware and other configurations
    app.use(express.json());

    // Use the user routes defined in userRoutes.js
    app.use("/api/auth", userRoutes);

    // Start the server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Authentication service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startApp();