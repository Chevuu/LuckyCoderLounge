const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");

// Import the userRoutes module
const userRoutes = require("./src/routes/userRoutes");

async function startApp() {
  try {
    await db;

    app.use(cors());

    // Middleware and other configurations
    app.use(express.json());

    // Use the user routes defined in userRoutes.js
    app.use("/api/users", userRoutes);

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startApp();