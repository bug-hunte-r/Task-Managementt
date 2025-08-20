import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MongoDBUrl!);
    console.log("✅ Connected to DB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

export default connectToDb;
