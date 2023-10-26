const express = require("express");
const mongoose = require("mongoose");
const { addUser, getUserById } = require("./src/controllers/userController");
const app = express();
// Import the MongoDB connection from your db.js
const db = require("./db");
const cors = require("cors");

// Import the userRoutes module
const userRoutes = require("./src/routes/userRoutes");

// Use async/await to ensure the database connection is established
async function startAppAddUser1() {
  try {
    await db;

    // Sample user data
    const sampleUser = {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      nationality: "US",
      language: "English",
    };

    // Create a request and response object (for simulating the Express route)
    const req = {
      body: sampleUser,
    };
    const res = {
      status: (statusCode) => ({
        send: (data) => {
          console.log("Response status:", statusCode);
          if (statusCode === 201) {
            console.log("Sample user saved:", data);
          } else {
            console.error("Error saving sample user:", data);
          }
        },
      }),
    };

    // Call the controller method to add the user
    addUser(req, res);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function startAppGetUser1() {
  try {
    await db;

    // Create a request and response object (for simulating the Express route)
    const req = {
      params: { userId: "1" }, // Set the user ID you want to retrieve
    };
    const res = {
      status: (statusCode) => ({
        send: (data) => {
          console.log("Response status:", statusCode);
          if (statusCode === 200) {
            console.log("User retrieved:", data);
          } else if (statusCode === 404) {
            console.error("User not found");
          } else {
            console.error("Error retrieving user:", data);
          }
        },
      }),
    };

    // Call the controller method to get the user by ID
    getUserById(req, res);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function getTheUserByAPI() {
  try {
    // Assuming your API route for getting a user by ID is '/api/users/:userId'
    const userId = 1; // Replace with the desired user ID
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);

    if (response.status === 200) {
      const data = await response.json();
      console.log("User retrieved by API:", data);
    } else if (response.status === 404) {
      console.error("User not found");
    } else {
      const errorMessage = await response.text();
      console.error("Error retrieving user by API:", errorMessage);
    }
  } catch (error) {
    console.error("Error fetching user by API:", error);
  }
}

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

// startAppGetUser1();

startAppAddUser1();

// startApp().then(getTheUserByAPI());

// startApp();
