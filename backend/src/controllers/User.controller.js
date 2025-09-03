import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

// ------------- Register -------------
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // check required fields
  if (!fullName || !email || !password || !role) {
    throw new ApiError(400, "All fields are required including role");
  }

  // validate role
  const allowedRoles = ["student", "teacher", "admin"];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  // check if user already exists with same email + role
  const existedUser = await User.findOne({ email, role });
  if (existedUser) throw new ApiError(400, "User already exists with this role");

  // create user
  const user = await User.create({ fullName, email, password, role });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json({
    success: true,
    data: createdUser,
    message: "User registered successfully",
  });
});


// ------------- Generate Tokens -------------
const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email, fullName: user.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

// ------------- Login -------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid password");

  const { accessToken, refreshToken } = await generateTokens(user);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .status(200)
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .json({ success: true, data: loggedInUser, accessToken, refreshToken, message: "User logged in successfully" });
});

// ------------- Logout -------------
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  res
    .status(200)
    .cookie("refreshToken", null, { httpOnly: true, secure: true })
    .cookie("accessToken", null, { httpOnly: true, secure: true })
    .json({ success: true, data: null, message: "User logged out successfully" });
});

// ------------- Refresh Token -------------
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

// ------------- Get Profile -------------
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({ success: true, data: user, message: "Profile fetched successfully" });
});

// ------------- Update Profile (phone & dob) -------------
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

// ------------- Change Password -------------
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) throw new ApiError(400, "Old and new passwords required");
  if (newPassword.length < 8) throw new ApiError(400, "Password must be at least 8 characters");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isOldCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldCorrect) throw new ApiError(401, "Old password incorrect");

  user.password = newPassword;
  user.refreshToken = null; // invalidate refresh token
  await user.save();

  res.status(200).json({ success: true, message: "Password changed successfully. Please log in again." });
});
