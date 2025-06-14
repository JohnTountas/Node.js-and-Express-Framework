const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI); //DATABASE_URL its inside views/.env file
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
