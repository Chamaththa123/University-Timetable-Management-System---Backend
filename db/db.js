const mongoose = require("mongoose");

require("dotenv").config();

// create db connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error connecting t mongoDB", error);
  }
};

module.exports = connectDB;
