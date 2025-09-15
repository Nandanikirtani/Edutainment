import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("🔎 Mongo URI:", uri);

    const connectionInstance = await mongoose.connect(uri, {
      dbName: "edtube", 
    });

    console.log(`✅ MongoDb connected!! DB HOST: ${connectionInstance.connection.host}`);
    console.log(`📂 Using DB: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDb;
