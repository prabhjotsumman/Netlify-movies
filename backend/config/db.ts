import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI =
    "mongodb+srv://prabh-user:prabh-imdb@cluster0.fh3m8.mongodb.net/";
  try {
    const conn = await mongoose.connect(MONGO_URI || process.env.MONGO_URI!, {
      connectTimeoutMS: 50000, // Adjust timeout
    });

    await mongoose.connect(MONGO_URI || process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
