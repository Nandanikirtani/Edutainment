import express from "express";
import multer from "multer";
import fs from "fs";
import {
  uploadVideo,
  approveRejectVideo,
  getApprovedVideos,
  getPendingVideos,
  getRejectedVideos,
  uploadCourseVideo,
  getAllCourses,
  getAdminUploadedCourses,
} from "../controllers/Video.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  console.log("User role in verifyAdmin:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Admin access required" });
  }
};

// ==============================
// General video routes (Git version)
// ==============================

// Route with JWT authentication + file upload
router.post("/upload", verifyJWT, upload.single("video"), uploadVideo);

// Admin routes
router.post("/approve-reject", verifyJWT, verifyAdmin, approveRejectVideo);
router.get("/pending", verifyJWT, verifyAdmin, getPendingVideos);
router.get("/rejected", verifyJWT, verifyAdmin, getRejectedVideos);

// Public route for approved videos
router.get("/approved", getApprovedVideos);

// ==============================
// Course video routes (Your admin additions)
// ==============================

// Admin: Upload course video (JWT + Admin)
router.post(
  "/courses/upload",
  verifyJWT,
  verifyAdmin,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  uploadCourseVideo
);

// Public: Get all course videos
router.get("/courses", getAllCourses);

// Admin: Get Courses Uploaded by Admin (JWT + Admin)
router.get("/admin/courses", verifyJWT, verifyAdmin, getAdminUploadedCourses);

export default router;
