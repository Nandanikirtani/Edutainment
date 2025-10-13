import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import {
  generateOTP,
  storeOTP,
  storeData,
  verifyOTP,
  clearOTP,
  getStoredData,
} from "../utils/otpUtils.js";
import jwt from "jsonwebtoken";

// Helper: Generate Tokens using User model methods
const generateTokens = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ---------------- Role-Based Access Control ----------------
const canRegisterRoles = ["student"]; // Only students can self-register

// ---------------- Send OTP for Registration ----------------
export const sendRegistrationOTP = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const role = "student"; // enforce student role

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase(), role });
  if (existingUser) throw new ApiError(400, "User already exists");

  const otp = generateOTP();
  storeOTP(email.toLowerCase(), otp);

  storeData(`${email.toLowerCase()}_userData`, {
    fullName,
    email: email.toLowerCase(),
    password,
    role,
  });

  try {
    await sendOtpEmail(email, otp, fullName);
  } catch (err) {
    console.warn("⚠️ OTP email failed to send, but OTP stored:", err.message);
  }

  res
    .status(200)
    .json(new apiResponse(200, { email: email.toLowerCase() }, "OTP sent successfully"));
});

// ---------------- Verify OTP and Register ----------------
export const verifyOTPAndRegister = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const otpResult = verifyOTP(email, otp);
  if (!otpResult.success) throw new ApiError(400, otpResult.message);

  const userData = getStoredData(`${email}_userData`);
  if (!userData) throw new ApiError(400, "Session expired, please retry");

  const exists = await User.findOne({ email: userData.email, role: userData.role });
  if (exists) {
    clearOTP(email);
    throw new ApiError(400, "User already registered");
  }

  const user = await User.create({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    isVerified: true,
  });

  clearOTP(email);

  const cleanUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .status(201)
    .json(new apiResponse(201, cleanUser, "User registered successfully"));
});

// ---------------- Unified Login (Admin + Student) ----------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid password");

  // Role-based restrictions
  if (user.role === "admin" && !user.isSuperAdmin)
    throw new ApiError(403, "Unauthorized admin account");
  if (user.role === "student" && !user.isVerified)
    throw new ApiError(403, "Please verify your email first");

  const { accessToken, refreshToken } = await generateTokens(user);
  const cleanUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(200).json(
    new apiResponse(200, {
      ...cleanUser.toObject(),
      accessToken,
      refreshToken,
    }, "Login successful")
  );
});

// ---------------- Logout ----------------
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  }

  res
    .status(200)
    .cookie("refreshToken", null, { httpOnly: true, secure: true })
    .cookie("accessToken", null, { httpOnly: true, secure: true })
    .json(new apiResponse(200, null, "User logged out successfully"));
});

// ---------------- Refresh Token ----------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Refresh token required");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(404, "User not found");
    if (user.refreshToken !== incomingRefreshToken)
      throw new ApiError(401, "Invalid refresh token");

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json(
      new apiResponse(200, { accessToken, refreshToken }, "Access token refreshed")
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

// ---------------- Get & Update Profile ----------------
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  res
    .status(200)
    .json(new apiResponse(200, user, "Profile fetched successfully"));
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { phone, dob } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (phone !== undefined) user.phone = phone;
  if (dob !== undefined) user.dob = dob;

  await user.save();
  const updatedUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .status(200)
    .json(new apiResponse(200, updatedUser, "Profile updated successfully"));
});

// ---------------- Change Password ----------------
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new ApiError(400, "Old and new passwords are required");
  if (newPassword.length < 8)
    throw new ApiError(400, "Password must be at least 8 characters long");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isOldCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldCorrect) throw new ApiError(401, "Old password incorrect");

  user.password = newPassword;
  user.refreshToken = null;
  await user.save();

  res
    .status(200)
    .json(new apiResponse(200, null, "Password changed successfully, please log in again"));
});
