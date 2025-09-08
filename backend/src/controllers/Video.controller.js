import { PendingVideo } from "../models/PendingVideo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const video = req.file;

  if (!title || !video) throw new ApiError(400, "Title and video are required");

  try {
    // Upload video to Cloudinary
    const result = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      folder: "faculty_videos",
    });

    // Save metadata + Cloudinary URL in DB
    const newVideo = await PendingVideo.create({
      facultyId: req.user._id,
      title,
      description,
      videoUrl: result.secure_url,
      status: "pending",
    });

    // Delete the local file after successful DB save
    if (fs.existsSync(video.path)) {
      fs.unlinkSync(video.path);
    }

    res.status(201).json({
      success: true,
      data: newVideo,
      message: "Video uploaded successfully, pending admin approval",
    });
  } catch (err) {
    // In case of any failure, delete local file if it still exists
    if (video && fs.existsSync(video.path)) fs.unlinkSync(video.path);
    console.error("Video upload error:", err);
    throw new ApiError(500, "Video upload failed", [err.message]);
  }
});
