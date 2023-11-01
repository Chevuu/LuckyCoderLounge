const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const slotRoutes = require("./src/routes/slotRoutes");

async function startApp() {
  try {
    await db;

    app.use(cors());

    // Middleware and other configurations
    app.use(express.json());

    // Use the slot routes defined in slotRoutes.js
    app.use("/api/slot", slotRoutes);

    // Start the server
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startApp();