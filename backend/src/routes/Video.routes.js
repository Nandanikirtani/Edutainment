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
  getCourseById,
  createCourse,
  addChapter,
  addVideoToChapter,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  deleteChapter,
  deleteVideo,
  addQuizToChapter,
  submitQuiz,
  markVideoComplete,
  getMyProgress,
  deleteQuiz,
  getCourseLeaderboard,
  getAllCoursesWithStudents,
  updateStudentPoints,
  getAllFaculty,
  updateCourseFaculty,
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

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 } // 200 MB
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

// Admin: Get all courses with enrolled students and points
router.get("/admin/courses-with-students", verifyJWT, verifyAdmin, getAllCoursesWithStudents);

// Admin: Update student points for a course
router.put("/admin/courses/:courseId/students/:studentId/points", verifyJWT, verifyAdmin, updateStudentPoints);

// Admin: Get all faculty/teachers
router.get("/admin/faculty", verifyJWT, verifyAdmin, getAllFaculty);

// Admin: Update course faculty
router.put("/admin/courses/:courseId/faculty", verifyJWT, verifyAdmin, updateCourseFaculty);

// ==============================
// Course Management Routes
// ==============================

// Public: Get single course details
router.get("/courses/:courseId", getCourseById);

// Admin/Faculty: Create new course
router.post("/courses", verifyJWT, createCourse);

// Admin/Faculty: Update course
router.put("/courses/:courseId", verifyJWT, updateCourse);

// Admin/Faculty: Delete course
router.delete("/courses/:courseId", verifyJWT, deleteCourse);

// Admin/Faculty: Add chapter to course
router.post("/courses/:courseId/chapters", verifyJWT, addChapter);

// Admin/Faculty: Add video to chapter
router.post(
  "/courses/:courseId/chapters/:chapterId/videos",
  verifyJWT,
  upload.single("video"),
  addVideoToChapter
);

// Admin/Faculty: Add quiz to chapter
router.post(
  "/courses/:courseId/chapters/:chapterId/quizzes",
  verifyJWT,
  addQuizToChapter
);

// Student: Submit quiz
router.post(
  "/courses/:courseId/chapters/:chapterId/quizzes/:quizId/submit",
  verifyJWT,
  submitQuiz
);

// Student: Mark video complete
router.post(
  "/courses/:courseId/chapters/:chapterId/videos/:videoId/complete",
  verifyJWT,
  markVideoComplete
);

// Student: Get my progress for a course
router.get(
  "/courses/:courseId/progress/me",
  verifyJWT,
  getMyProgress
);

// Public: Course leaderboard (top by points)
router.get(
  "/courses/:courseId/leaderboard",
  getCourseLeaderboard
);
 
 // Admin/Faculty: Delete quiz
 router.delete("/courses/:courseId/chapters/:chapterId/quizzes/:quizId", verifyJWT, deleteQuiz);
 
 // Student: Enroll in course
router.post("/courses/:courseId/enroll", verifyJWT, enrollInCourse);

// Admin/Faculty: Delete chapter
router.delete("/courses/:courseId/chapters/:chapterId", verifyJWT, deleteChapter);

// Admin/Faculty: Delete video from chapter
router.delete("/courses/:courseId/chapters/:chapterId/videos/:videoId", verifyJWT, deleteVideo);

export default router;
