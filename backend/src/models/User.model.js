import mongoose, { Schema } from "mongoose"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: false, // composite index will enforce uniqueness with role
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"], // keep teacher if needed
      required: true,
    },

    // 🔹 Profile fields
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
    rollNo: { type: String, default: null },

    refreshToken: { type: String },

    // 🔹 OTP fields (for future OTP logic)
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    // 🔹 First login verify check
    isVerified: { type: Boolean, default: false },

    // 🔹 Trusted admin flag
    isSuperAdmin: { type: Boolean, default: false }, // required for admin login check

    // 🔹 Earned badges
    badges: [
      {
        badgeType: { type: String, enum: ["50", "75", "90"], required: true },
        courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        courseName: { type: String, required: true },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// 🔹 Prevent duplicate email + role combination
userSchema.index({ email: 1, role: 1 }, { unique: true });

// 🔹 Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Password validation
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🔹 Generate JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔹 Generate JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
