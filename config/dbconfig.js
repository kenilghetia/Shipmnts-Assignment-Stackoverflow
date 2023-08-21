const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://root:mongodb@temp1.bbqvdfb.mongodb.net/Shipmnts-Assignment?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDB;
