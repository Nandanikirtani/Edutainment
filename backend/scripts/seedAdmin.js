// scripts/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../src/models/User.model.js";

dotenv.config();

const admins = [
  { email: "gjune0987@gmail.com", password: "khushi123", fullName: "Khushi Admin" },
  { email: "khushirajpal07@gmail.com", password: "khushi123", fullName: "Khushi Admin" },
  { email: "jashankk908@gmail.com", password: "123", fullName: "Khushi Admin" },
  { email: "anjubala691@gmail.com", password: "123", fullName: "Khushi Admin" },
  { email: "nandanikirtani99@gmail.com", password: "123", fullName: "Nandani Admin" }
];

const seedAdmins = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to database:", db.connection.name);

    for (const admin of admins) {
      const email = admin.email.toLowerCase();
      const existingAdmin = await User.findOne({ email, role: "admin" });

      if (existingAdmin) {
        existingAdmin.password = admin.password; // plain password (will be hashed automatically)
        existingAdmin.fullName = admin.fullName;
        existingAdmin.isVerified = true;
        existingAdmin.isSuperAdmin = true; // ✅ Mark as trusted admin
        await existingAdmin.save();
        console.log(`🔄 Updated existing admin: ${admin.email}`);
      } else {
        const newAdmin = new User({
          fullName: admin.fullName,
          email,
          password: admin.password, // plain password
          role: "admin",
          isVerified: true,
          isSuperAdmin: true, // ✅ Mark as trusted admin
        });
        await newAdmin.save();
        console.log(`✅ Added new admin: ${admin.email}`);
      }
    }

    console.log("🎉 Admin seeding completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admins:", err);
    process.exit(1);
  }
};

seedAdmins();
