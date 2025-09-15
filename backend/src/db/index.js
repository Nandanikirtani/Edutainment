import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Ab direct .env se URI le raha hai, DB_NAME ki zarurat nahi
    const uri = process.env.MONGODB_URI;
    console.log("🔎 Mongo URI:", uri);

    const connectionInstance = await mongoose.connect(uri);

    console.log(`✅ MongoDb connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDb;
