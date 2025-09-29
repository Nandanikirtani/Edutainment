import { PendingVideo } from "../models/PendingVideo.model.js";
import { AcceptedVideo } from "../models/AcceptedVideo.model.js";
import { RejectedVideo } from "../models/RejectedVideo.model.js";
import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

// ===============================================
//                Original Video (Team Mate's) Functions
// ===============================================

// ✅ Get all general videos (using AcceptedVideo, likely for a main video feed)
export const getVideos = asyncHandler(async (req, res) => {
  const videos = await AcceptedVideo.find({}).populate('facultyId', 'fullName').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: videos,
  });
});

// ✅ Like a video
export const likeVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await AcceptedVideo.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  video.likes = (video.likes || 0) + 1;
  await video.save();

  res.status(200).json({
    success: true,
    message: "Video liked successfully",
    likes: video.likes,
  });
});

// ✅ Save a video
export const saveVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await AcceptedVideo.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  video.saves = (video.saves || 0) + 1;
  await video.save();

  res.status(200).json({
    success: true,
    message: "Video saved successfully",
    saves: video.saves,
  });
});

// ✅ Share a video
export const shareVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await AcceptedVideo.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  video.shares = (video.shares || 0) + 1;
  await video.save();

  res.status(200).json({
    success: true,
    message: "Video shared successfully",
    shares: video.shares,
  });
});

// ✅ Comment on a video
export const commentVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  const video = await AcceptedVideo.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  if (!text || text.trim() === "") {
    throw new ApiError(400, "Comment text is required");
  }

  video.comments.push({ text }); // Assumes comments array exists in AcceptedVideo schema
  await video.save();

  res.status(200).json({
    success: true,
    message: "Comment added successfully",
    comments: video.comments,
  });
});

// ===============================================
//                 Reels Video (My Implementation) Functions
// ===============================================

// Faculty: Upload reel video
export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const video = req.file;

  if (!title || !video) {
    throw new ApiError(400, "Title and video file are required for reel upload");
  }

  try {
    const result = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      folder: "reel_videos",
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
      message: "Reel uploaded successfully, pending admin approval",
    });
  } catch (err) {
    if (video && fs.existsSync(video.path)) fs.unlinkSync(video.path);
    console.error("Reel upload error:", err);
    throw new ApiError(500, "Reel upload failed", [err.message]);
  }
});

// Admin: Approve/Reject Reels Video
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

// Admin: Get Pending Reels Videos
export const getPendingVideos = asyncHandler(async (req, res) => {
  const pendingVideos = await PendingVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: pendingVideos,
    message: "Pending reels fetched successfully",
  });
});

// Admin: Get Rejected Reels Videos
export const getRejectedVideos = asyncHandler(async (req, res) => {
  const rejectedVideos = await RejectedVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: rejectedVideos,
    message: "Rejected reels fetched successfully",
  });
});

// Public: Get Approved Reels Videos (renamed from '/approved' to '/reels/approved' in routes)
export const getApprovedReels = asyncHandler(async (req, res) => {
  const approvedReels = await AcceptedVideo.find({}).populate('facultyId', 'fullName');
  res.status(200).json({
    success: true,
    data: approvedReels,
    message: "Approved reels fetched successfully",
  });
});

// ===============================================
//                 Course Video (New) Functions
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





