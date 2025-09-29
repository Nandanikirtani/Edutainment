import { PendingVideo } from "../models/PendingVideo.model.js";
import { AcceptedVideo } from "../models/AcceptedVideo.model.js";
import { RejectedVideo } from "../models/RejectedVideo.model.js";
import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

// ===============================================
//               Original Git Video Functions
// ===============================================

// Upload video (original Git version)
export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const video = req.file;

  if (!title || !video) throw new ApiError(400, "Title and video are required");

  try {
    const result = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      folder: "faculty_videos",
    });

    const newVideo = await PendingVideo.create({
      facultyId: req.user._id,
      title,
      description,
      videoUrl: result.secure_url,
      status: "pending",
    });

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
  const { videoId, status } = req.body;

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
      reason: req.body.reason || "No reason provided",
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

// ===============================================
//               Admin Course Video Functions
// ===============================================

// Admin: Upload Course Video
export const uploadCourseVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const videoFile = req.files?.videoFile?.[0];
  const thumbnailFile = req.files?.thumbnailFile?.[0];

  if (!title || !description || !videoFile) {
    throw new ApiError(400, "Title, description, and video file are required for course upload");
  }

  try {
    const videoResult = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "course_videos",
    });
    let thumbnailUrl = null;
    if (thumbnailFile) {
      const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: "image",
        folder: "course_thumbnails",
      });
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const newCourse = await Course.create({
      facultyId: req.user._id,
      title,
      description,
      videoUrl: videoResult.secure_url,
      thumbnailUrl,
    });

    if (fs.existsSync(videoFile.path)) fs.unlinkSync(videoFile.path);
    if (thumbnailFile && fs.existsSync(thumbnailFile.path)) fs.unlinkSync(thumbnailFile.path);

    res.status(201).json({
      success: true,
      data: newCourse,
      message: "Course video uploaded successfully",
    });
  } catch (err) {
    if (videoFile && fs.existsSync(videoFile.path)) fs.unlinkSync(videoFile.path);
    if (thumbnailFile && fs.existsSync(thumbnailFile.path)) fs.unlinkSync(thumbnailFile.path);
    console.error("Course upload error:", err);
    throw new ApiError(500, "Course video upload failed", [err.message]);
  }
});

// Public: Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate('facultyId', 'fullName').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: courses,
    message: "All courses fetched successfully",
  });
});

// Admin: Get Courses Uploaded by Admin
export const getAdminUploadedCourses = asyncHandler(async (req, res) => {
  const adminCourses = await Course.find({ facultyId: req.user._id }).populate('facultyId', 'fullName').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: adminCourses,
    message: "Admin uploaded courses fetched successfully",
  });
});
