import express from "express";
import multer from "multer";
import fs from "fs";
import {
  // Original Video (Team Mate's) Functions
  getVideos,
  likeVideo,
  saveVideo,
  shareVideo,
  commentVideo,
  // Reels Video (My Implementation) Functions
  uploadVideo,
  approveRejectVideo,
  getApprovedReels, // Renamed to avoid conflict
  getPendingVideos,
  getRejectedVideos,
  // Course Video (New) Functions
  uploadCourseVideo,
  getAllCourses,
  getAdminUploadedCourses,
} from "../controllers/Video.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config for reels (single video file)
const reelUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `reel-${Date.now()}-${file.originalname}`),
  }),
});

// Multer storage config for course videos (video + optional thumbnail)
const courseUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      if (file.fieldname === "videoFile") {
        cb(null, `course-video-${Date.now()}-${file.originalname}`);
      } else if (file.fieldname === "thumbnailFile") {
        cb(null, `course-thumbnail-${Date.now()}-${file.originalname}`);
      }
    },
  }),
});

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  console.log("User role in verifyAdmin:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Admin access required" });
  }
};

// ===============================================
//                Original Video (Team Mate's) Routes
// ===============================================

// Public route: get all general videos
router.get("/", getVideos); // Renamed from '/approved' to avoid conflict with reels

// Like video
router.post("/:videoId/like", verifyJWT, likeVideo);

// Save video
router.post("/:videoId/save", verifyJWT, saveVideo);

// Share video
router.post("/:videoId/share", verifyJWT, shareVideo);

// Comment video
router.post("/:videoId/comments", verifyJWT, commentVideo);

// ===============================================
//                 Reels Video (My Implementation) Routes
// ===============================================

// Faculty: Upload reel video (requires JWT)
router.post("/reels/upload", verifyJWT, reelUpload.single("video"), uploadVideo);

// Admin: Approve or reject reel video (requires JWT + Admin)
router.post("/reels/approve-reject", verifyJWT, verifyAdmin, approveRejectVideo);

// Admin: Get pending reel videos (requires JWT + Admin)
router.get("/reels/pending", verifyJWT, verifyAdmin, getPendingVideos);

// Admin: Get rejected reel videos (requires JWT + Admin)
router.get("/reels/rejected", verifyJWT, verifyAdmin, getRejectedVideos);

// Public: Get all approved reel videos
router.get("/reels/approved", getApprovedReels);

// ===============================================
//                 Course Video (New) Routes
// ===============================================

// Admin: Upload course video (requires JWT + Admin, supports video and thumbnail)
router.post("/courses/upload",
  verifyJWT,
  verifyAdmin,
  courseUpload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 }
  ]),
  uploadCourseVideo
);

// Public: Get all course videos
router.get("/courses", getAllCourses);

// Admin: Get Courses Uploaded by Admin (requires JWT + Admin)
router.get("/admin/courses", verifyJWT, verifyAdmin, getAdminUploadedCourses);

export default router;





