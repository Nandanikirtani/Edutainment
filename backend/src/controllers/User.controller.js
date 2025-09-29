import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { generateOTP, storeOTP, storeData, verifyOTP, clearOTP, getStoredData } from "../utils/otpUtils.js";
import jwt from "jsonwebtoken";

// ---------------- Send OTP for Registration ----------------
export const sendRegistrationOTP = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    throw new ApiError(400, "All fields are required including role");
  }

  const allowedRoles = ["student", "teacher", "admin"];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const existedUser = await User.findOne({ email, role });
  if (existedUser) throw new ApiError(400, "User already exists with this role");

  // Generate and send OTP
  const otp = generateOTP();
  storeOTP(email, otp);
  
  // Store user data temporarily
  storeData(`${email}_userData`, { fullName, email, password, role });

  // Try to send email, but continue even if it fails
  try {
    await sendOtpEmail(email, otp, fullName);
  } catch (emailError) {
    console.log("⚠️ Email sending failed, but OTP is logged in console");
  }

  res.status(200).json(
    new apiResponse(200, { email }, "OTP sent successfully to your email")
  );
});

// ---------------- Verify OTP and Register User ----------------
export const verifyOTPAndRegister = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  // Verify OTP
  const otpVerification = verifyOTP(email, otp);
  if (!otpVerification.success) {
    throw new ApiError(400, otpVerification.message);
  }

  // Get stored user data
  const userData = getStoredData(`${email}_userData`);
  if (!userData) {
    throw new ApiError(400, "Registration session expired. Please start again.");
  }

  const user = await User.create({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    isVerified: true
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  // Clean up stored data
  clearOTP(`${email}_userData`);

  res.status(201).json(
    new apiResponse(201, createdUser, "User registered successfully")
  );
});

// ---------------- Register (Legacy - keeping for backward compatibility) ----------------
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    throw new ApiError(400, "All fields are required including role");
  }

  const allowedRoles = ["student", "teacher", "admin"];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const existedUser = await User.findOne({ email, role });
  if (existedUser) throw new ApiError(400, "User already exists with this role");

  const user = await User.create({ fullName, email, password, role });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json({
    success: true,
    data: createdUser,
    message: "User registered successfully",
  });
});

// ---------------- Token Generator ----------------
const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email, fullName: user.fullName, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" } // Temporarily set expiry to 1 day for easier debugging
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Temporarily set expiry to 7 days for easier debugging
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ---------------- Login (NO OTP) ----------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Email, password, and role are required");
  }

  const user = await User.findOne({ email, role });
  if (!user) throw new ApiError(401, "Invalid credentials or role");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid password");

  const { accessToken, refreshToken } = await generateTokens(user);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .status(200)
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .json({
      success: true,
      data: loggedInUser,
      accessToken,
      refreshToken,
      message: "Login successful",
    });
});

// ---------------- Logout ----------------
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  res
    .status(200)
    .cookie("refreshToken", null, { httpOnly: true, secure: true })
    .cookie("accessToken", null, { httpOnly: true, secure: true })
    .json({ success: true, data: null, message: "User logged out successfully" });
});

// ---------------- Refresh Token ----------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Refresh token required");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(404, "User not found");
    if (user.refreshToken !== incomingRefreshToken) throw new ApiError(401, "Invalid refresh token");

    const { accessToken, refreshToken } = await generateTokens(user);
    res
      .status(200)
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .json({ success: true, data: null, accessToken, refreshToken, message: "Access token refreshed" });
  } catch (err) {
    throw new ApiError(500, "Failed to refresh access token");
  }
});

// ---------------- Get Profile ----------------
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ success: true, data: user, message: "Profile fetched successfully" });
});

// ---------------- Update Profile ----------------
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { phone, dob } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (phone !== undefined) user.phone = phone;
  if (dob !== undefined) user.dob = dob;

  await user.save();
  const updatedUser = await User.findById(user._id).select("-password -refreshToken");
  res.status(200).json({ success: true, data: updatedUser, message: "Profile updated successfully" });
});

// ---------------- Change Password ----------------
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) throw new ApiError(400, "Old and new passwords required");
  if (newPassword.length < 8) throw new ApiError(400, "Password must be at least 8 characters");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isOldCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldCorrect) throw new ApiError(401, "Old password incorrect");

  user.password = newPassword;
  user.refreshToken = null;
  await user.save();

  res.status(200).json({ success: true, message: "Password changed successfully. Please log in again." });
});
