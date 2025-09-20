import express from "express";
import {
  getVideos,
  likeVideo,
  saveVideo,
  shareVideo,
  commentVideo,
} from "../controllers/Video.controller.js";

const router = express.Router();

// ✅ Public route: get all videos
router.get("/approved", getVideos);

// ✅ Like video
router.post("/:videoId/like", likeVideo);

// ✅ Save video
router.post("/:videoId/save", saveVideo);

// ✅ Share video
router.post("/:videoId/share", shareVideo);

// ✅ Comment video
router.post("/:videoId/comments", commentVideo);

export default router;





