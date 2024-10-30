// Import and configure environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

// Import the database connection function
const connectToDatabase = require("./config/db");

// Initialize the app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configuration variables
const PORT = process.env.PORT || 3000;

// Start the server only if database connection is successful
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });

  app.use("/api/task", taskRoutes);
};

// Start the server
startServer();
