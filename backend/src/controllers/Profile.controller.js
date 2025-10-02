import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const user = await User.findById(userId).select("-password -refreshToken -otp -otpExpiry");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  res.status(200).json(
    new apiResponse(200, user, "Profile fetched successfully")
  );
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fullName, phone, rollNo, avatar } = req.body;
  
  // Validation
  if (!fullName || fullName.trim() === "") {
    throw new ApiError(400, "Full name is required");
  }
  
  // Prepare update data
  const updateData = {
    fullName: fullName.trim(),
    phone: phone?.trim() || null,
    rollNo: rollNo?.trim() || null,
  };
  
  // Only update avatar if provided
  if (avatar !== undefined) {
    updateData.avatar = avatar;
  }
  
  // Find and update user
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken -otp -otpExpiry");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  res.status(200).json(
    new apiResponse(200, user, "Profile updated successfully")
  );
});

// Update profile avatar
export const updateAvatar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const avatarLocalPath = req.file?.path;
  
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  
  if (!avatar) {
    throw new ApiError(400, "Error while uploading avatar");
  }
  
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.url
      }
    },
    { new: true }
  ).select("-password -refreshToken -otp -otpExpiry");
  
  res.status(200).json(
    new apiResponse(200, { avatar: user.avatar }, "Avatar updated successfully")
  );
});

// Remove profile avatar
export const removeAvatar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: null
      }
    },
    { new: true }
  ).select("-password -refreshToken -otp -otpExpiry");
  
  res.status(200).json(
    new apiResponse(200, { avatar: null }, "Avatar removed successfully")
  );
});