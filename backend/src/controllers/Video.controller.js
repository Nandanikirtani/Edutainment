import { PendingVideo } from "../models/PendingVideo.model.js"; // single unified model
import { AcceptedVideo } from "../models/AcceptedVideo.model.js"; // Import new model
import { RejectedVideo } from "../models/RejectedVideo.model.js"; // Import new model
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

// Upload video (remains same)
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
      status: "pending", // default pending
    });

    // Delete the local file after successful DB save
    if (fs.existsSync(video.path)) fs.unlinkSync(video.path);

    res.status(201).json({
      success: true,
      data: newVideo,
      message: "Video uploaded successfully, pending admin approval",
    });
  } catch (err) {
    if (video && fs.existsSync(video.path)) fs.unlinkSync(video.path);
    console.error("Video upload error:", err);
    throw new ApiError(500, "Video upload failed", [err.message]);
  }
});

export const approveRejectVideo = asyncHandler(async (req, res) => {
  const { videoId, status } = req.body; // status: "accepted" or "rejected"

  if (!videoId || !status) {
    throw new ApiError(400, "Video ID and status are required");
  }

  const video = await PendingVideo.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found in pending queue");
  }

  if (status === "accepted") {
    const acceptedVideo = await AcceptedVideo.create({
      facultyId: video.facultyId,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      status: "accepted",
    });
    await PendingVideo.findByIdAndDelete(videoId);

    res.status(200).json({
      success: true,
      data: acceptedVideo,
      message: "Video approved and moved to accepted videos",
    });
  } else if (status === "rejected") {
    const rejectedVideo = await RejectedVideo.create({
      facultyId: video.facultyId,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      status: "rejected",
      reason: req.body.reason || "No reason provided", // Optional rejection reason
    });
    await PendingVideo.findByIdAndDelete(videoId);

    res.status(200).json({
      success: true,
      data: rejectedVideo,
      message: "Video rejected and moved to rejected videos",
    });
  } else {
    throw new ApiError(400, "Invalid status provided. Must be 'accepted' or 'rejected'.");
  }
});

export const getApprovedVideos = asyncHandler(async (req, res) => {
  const approvedVideos = await AcceptedVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: approvedVideos,
    message: "Approved videos fetched successfully",
  });
});

export const getPendingVideos = asyncHandler(async (req, res) => {
  const pendingVideos = await PendingVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: pendingVideos,
    message: "Pending videos fetched successfully",
  });
});

export const getRejectedVideos = asyncHandler(async (req, res) => {
  const rejectedVideos = await RejectedVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: rejectedVideos,
    message: "Rejected videos fetched successfully",
  });
});