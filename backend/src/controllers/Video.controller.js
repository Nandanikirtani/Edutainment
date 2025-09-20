import { AcceptedVideo } from "../models/AcceptedVideo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// ✅ Get all videos
export const getVideos = asyncHandler(async (req, res) => {
  const videos = await AcceptedVideo.find().sort({ createdAt: -1 });
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

  video.comments.push({ text });
  await video.save();

  res.status(200).json({
    success: true,
    message: "Comment added successfully",
    comments: video.comments,
  });
});





