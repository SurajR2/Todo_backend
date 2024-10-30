// Import mongoose package
const mongoose = require("mongoose");

// Load environment variables
const DB_URI = process.env.DB_URI;

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Adjust as needed for your network conditions
      socketTimeoutMS: 3000,
    });
    console.log("✅ Connected to database successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process with failure if unable to connect to DB
  }
};

// Export the function to be used in other files
module.exports = connectToDatabase;
