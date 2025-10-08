import { PendingVideo } from "../models/PendingVideo.model.js";
import { AcceptedVideo } from "../models/AcceptedVideo.model.js";
import { RejectedVideo } from "../models/RejectedVideo.model.js";
import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import { User } from "../models/User.model.js";

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
  console.log("req.files:", req.files);
  console.log("REQ.BODY:", req.body);

  const { title, description,facultyName,department,rating } = req.body;
  const videoFile = req.files?.videoFile?.[0];
 let thumbnailUrl = null;

// If a file is uploaded
const thumbnailFile = req.files?.thumbnailFile?.[0];
if (thumbnailFile) {
  const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, {
    resource_type: "image",
    folder: "course_thumbnails",
  });
  thumbnailUrl = thumbnailResult.secure_url;

  // Remove local file
  if (fs.existsSync(thumbnailFile.path)) fs.unlinkSync(thumbnailFile.path);
}
// If frontend sends a direct URL
else if (req.body.thumbnailUrl) {
  thumbnailUrl = req.body.thumbnailUrl;
}

// Throw error if no thumbnail
if (!thumbnailUrl) throw new ApiError(400, "Thumbnail is required");



  if (!title || !description || !videoFile) {
    throw new ApiError(400, "Title, description, and video file are required for course upload");
  }

  try {
    const videoResult = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "course_videos",
    });

    const newCourse = await Course.create({
      facultyName,
      title,
      description,
      department,
      rating,
      videoUrl: videoResult.secure_url,
      thumbnailUrl,
    });

    if (fs.existsSync(videoFile.path)) fs.unlinkSync(videoFile.path);
    if (thumbnailUrl && fs.existsSync(thumbnailUrl.path)) fs.unlinkSync(thumbnailUrl.path);

    res.status(201).json({
      success: true,
      data: newCourse,
      message: "Course video uploaded successfully",
    });
  } catch (err) {
    if (videoFile && fs.existsSync(videoFile.path)) fs.unlinkSync(videoFile.path);
    if (thumbnailUrl && fs.existsSync(thumbnailUrl.path)) fs.unlinkSync(thumbnailUrl.path);
    console.error("Course upload error:", err);
    throw new ApiError(500, "Course video upload failed", [err.message]);
  }
});

// Public: Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
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

// Admin: Get all courses with enrolled students and their points
export const getAllCoursesWithStudents = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .populate('facultyId', 'fullName email')
    .populate('enrolledStudents', 'fullName email')
    .sort({ createdAt: -1 });

  // Format data to include student progress/points
  const coursesWithStudentData = courses.map(course => {
    const students = course.enrolledStudents.map(student => {
      const studentProgress = course.progress.find(
        p => p.studentId.toString() === student._id.toString()
      );
      return {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        points: studentProgress ? studentProgress.points : 0
      };
    });

    return {
      _id: course._id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      facultyId: course.facultyId,
      department: course.department,
      level: course.level,
      enrolledStudents: students,
      totalEnrolled: students.length
    };
  });

  res.status(200).json({
    success: true,
    data: coursesWithStudentData,
    message: "All courses with student data fetched successfully",
  });
});

// Admin: Update student points for a course
export const updateStudentPoints = asyncHandler(async (req, res) => {
  const { courseId, studentId } = req.params;
  const { points } = req.body;

  if (typeof points !== 'number' || points < 0) {
    throw new ApiError(400, "Valid points value is required (must be >= 0)");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Check if student is enrolled
  const isEnrolled = course.enrolledStudents.some(
    s => s.toString() === studentId
  );
  if (!isEnrolled) {
    throw new ApiError(404, "Student is not enrolled in this course");
  }

  // Find or create student progress
  let studentProgress = course.progress.find(
    p => p.studentId.toString() === studentId
  );

  if (!studentProgress) {
    studentProgress = {
      studentId,
      completedVideoIds: [],
      completedQuizIds: [],
      points: points
    };
    course.progress.push(studentProgress);
  } else {
    studentProgress.points = points;
  }

  await course.save();

  const updatedCourse = await Course.findById(courseId)
    .populate('enrolledStudents', 'fullName email');

  res.status(200).json({
    success: true,
    data: updatedCourse,
    message: "Student points updated successfully",
  });
});

// Admin: Get all faculty/teachers for dropdown
export const getAllFaculty = asyncHandler(async (req, res) => {
  const faculty = await User.find({ role: { $in: ['teacher', 'admin'] } })
    .select('fullName email role')
    .sort({ fullName: 1 });

  res.status(200).json({
    success: true,
    data: faculty,
    message: "Faculty list fetched successfully",
  });
});

// Helper: Check and award badges based on course total points percentage
const checkAndAwardBadge = async (course, studentId) => {
  const student = await User.findById(studentId);
  if (!student) return null;

  // Get student's progress
  const progress = course.progress.find(p => p.studentId.toString() === studentId.toString());
  if (!progress) return null;

  // Calculate total possible points in course
  let totalPoints = 0;
  course.chapters.forEach(ch => {
    (ch.quizzes || []).forEach(qz => {
      // Each quiz awards 20 points per question
      const questionsCount = (qz.questions || []).length;
      totalPoints += questionsCount * 20;
    });
  });
  
  if (totalPoints === 0) return null;

  // Get student's current points
  const currentPoints = progress.points || 0;

  // Calculate required points for each badge based on course total
  const badge50Points = Math.ceil(totalPoints * 0.5);  // 50% of total points
  const badge75Points = Math.ceil(totalPoints * 0.75); // 75% of total points
  const badge90Points = Math.ceil(totalPoints * 0.9);  // 90% of total points

  // Check which badge to award based on percentage of total course points
  let badgeToAward = null;
  if (currentPoints >= badge90Points) badgeToAward = '90';
  else if (currentPoints >= badge75Points) badgeToAward = '75';
  else if (currentPoints >= badge50Points) badgeToAward = '50';

  if (!badgeToAward) return null;

  // Check if student already has this badge for this course
  const alreadyHasBadge = student.badges?.some(
    b => b.courseId.toString() === course._id.toString() && b.badgeType === badgeToAward
  );

  if (alreadyHasBadge) return null;

  // Award the badge
  if (!student.badges) student.badges = [];
  student.badges.push({
    badgeType: badgeToAward,
    courseId: course._id,
    courseName: course.title,
    earnedAt: new Date()
  });
  await student.save();

  const completionPercentage = Math.floor((currentPoints / totalPoints) * 100);

  return {
    badgeType: badgeToAward,
    completionPercentage,
    courseName: course.title,
    currentPoints,
    totalPoints,
    requiredPoints: {
      badge50: badge50Points,
      badge75: badge75Points,
      badge90: badge90Points
    }
  };
};

// Admin: Update course faculty
export const updateCourseFaculty = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { facultyId } = req.body;

  if (!facultyId) {
    throw new ApiError(400, "Faculty ID is required");
  }

  // Verify the new faculty exists and has appropriate role
  const faculty = await User.findById(facultyId);
  if (!faculty) {
    throw new ApiError(404, "Faculty not found");
  }

  if (!['teacher', 'admin'].includes(faculty.role)) {
    throw new ApiError(400, "Selected user must be a teacher or admin");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  course.facultyId = facultyId;
  await course.save();

  const updatedCourse = await Course.findById(courseId)
    .populate('facultyId', 'fullName email role')
    .populate('enrolledStudents', 'fullName email');

  res.status(200).json({
    success: true,
    data: updatedCourse,
    message: "Course faculty updated successfully",
  });
});

// ===============================================
//               Course Management APIs
// ===============================================

// Helper function to check if user can manage course


const canManageCourse = (user) => {
  console.log("🔍 Course Management Check:");
  console.log("User ID:", user._id);
  console.log("User Role:", user.role);

  const canManage = user.role === "admin";
  console.log("Can Manage:", canManage);

  return canManage;
};

// Get single course with chapters and videos
export const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  const course = await Course.findById(courseId)
    .populate('facultyId', 'fullName email')
    .populate('enrolledStudents', 'fullName email');
    
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  res.status(200).json({
    success: true,
    data: course,
    message: "Course fetched successfully",
  });
});

// Create new course (Admin/Faculty only)
export const createCourse = asyncHandler(async (req, res) => {
  const {facultyName, title, description, department, level, price, backgroundImage,rating } = req.body;
  
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }
  
  const course = await Course.create({
    facultyName,    
    title,
    description,
    department: department || "General",
    level: level || "Beginner",
    price: price || 0,
    rating: rating || 0,
    backgroundImage,
  });
  
  const createdCourse = await Course.findById(course._id).populate('facultyId', 'fullName');
  
  res.status(201).json({
    success: true,
    data: createdCourse,
    message: "Course created successfully",
  });
});

// Add chapter to course (Admin/Faculty only)
export const addChapter = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;
  
  if (!title) {
    throw new ApiError(400, "Chapter title is required");
  }
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only add chapters to your own courses");
  }
  
  const newChapter = {
    title,
    description: description || "",
    order: course.chapters.length,
  };
  
  course.chapters.push(newChapter);
  await course.save();
  
  res.status(201).json({
    success: true,
    data: course,
    message: "Chapter added successfully",
  });
});

// Admin/Faculty: Add quiz to chapter
export const addQuizToChapter = asyncHandler(async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description, questions, points } = req.body;

  if (!title) throw new ApiError(400, "Quiz title is required");

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only add quizzes to your own courses");
  }

  const chapter = course.chapters.id(chapterId);
  if (!chapter) throw new ApiError(404, "Chapter not found");

  // Validate and sanitize questions
  const rawQuestions = Array.isArray(questions) ? questions : [];
  if (rawQuestions.length === 0) {
    throw new ApiError(400, "At least one question is required with a correct answer");
  }
  const sanitizedQuestions = rawQuestions.map((q, idx) => {
    const text = (q.text || "").trim();
    const opts = Array.isArray(q.options) ? q.options.map(o => (o || "").trim()) : [];
    const ci = Number.isInteger(q.correctIndex) ? q.correctIndex : -1;
    if (!text) throw new ApiError(400, `Question ${idx + 1}: text is required`);
    if (opts.length < 2) throw new ApiError(400, `Question ${idx + 1}: at least two options are required`);
    if (opts.some(o => !o)) throw new ApiError(400, `Question ${idx + 1}: options cannot be empty`);
    if (ci < 0 || ci >= opts.length) throw new ApiError(400, `Question ${idx + 1}: select the correct answer`);
    return { text, options: opts, correctIndex: ci };
  });

  // Calculate points: 20 points per question
  const calculatedPoints = sanitizedQuestions.length * 20;

  const newQuiz = {
    title,
    description: description || "",
    questions: sanitizedQuestions,
    points: calculatedPoints,
  };

  chapter.quizzes.push(newQuiz);
  await course.save();

  const updated = await Course.findById(courseId);
  res.status(201).json({ success: true, data: updated, message: "Quiz added successfully" });
});

// Student: Submit quiz answers
export const submitQuiz = asyncHandler(async (req, res) => {
  const { courseId, chapterId, quizId } = req.params;
  const { answers } = req.body; // array of selected option indexes

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  // Must be enrolled
  if (!course.enrolledStudents.some(s => s.toString() === req.user._id.toString())) {
    throw new ApiError(403, "Enroll in this course to take quizzes");
  }

  const chapter = course.chapters.id(chapterId);
  if (!chapter) throw new ApiError(404, "Chapter not found");
  const quiz = chapter.quizzes.id(quizId);
  if (!quiz) throw new ApiError(404, "Quiz not found");

  const qs = quiz.questions || [];
  const ans = Array.isArray(answers) ? answers : [];
  let correct = 0;
  qs.forEach((q, idx) => {
    if (typeof ans[idx] === 'number' && ans[idx] === q.correctIndex) correct += 1;
  });
  const total = qs.length;

  // Helpers for progress
  const getOrCreateProgress = (course, studentId) => {
    let progress = course.progress.find(p => p.studentId.toString() === studentId.toString());
    if (!progress) {
      progress = { studentId, completedVideoIds: [], completedQuizIds: [], points: 0 };
      course.progress.push(progress);
    }
    return progress;
  };

  // Award points only when all answers are correct, and only once per quiz
  const progress = getOrCreateProgress(course, req.user._id);
  let addedPoints = 0;
  const alreadyCompleted = progress.completedQuizIds.some(id => id.toString() === quiz._id.toString());
  if (!alreadyCompleted) {
    if (total > 0 && correct === total) {
      progress.completedQuizIds.push(quiz._id);
      // Always calculate points based on questions count: 20 per question
      const pts = qs.length * 20;
      progress.points += pts;
      addedPoints = pts;
    }
  }
  await course.save();

  // Check for badge award
  const badgeAwarded = await checkAndAwardBadge(course, req.user._id);

  res.status(200).json({
    success: true,
    data: { correct, total, addedPoints, points: progress.points, badgeAwarded },
    message: "Quiz submitted"
  });
});

// Admin/Faculty: Delete quiz from chapter
export const deleteQuiz = asyncHandler(async (req, res) => {
  const { courseId, chapterId, quizId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only delete quizzes from your own courses");
  }

  const chapter = course.chapters.id(chapterId);
  if (!chapter) throw new ApiError(404, "Chapter not found");
  const quiz = chapter.quizzes.id(quizId);
  if (!quiz) throw new ApiError(404, "Quiz not found");

  // Get the actual points that were awarded for this quiz
  // Use stored points if available, otherwise calculate from questions
  const quizPoints = quiz.points || ((quiz.questions || []).length * 20);

  // Deduct points from all students who completed this quiz
  course.progress.forEach(progress => {
    const completedIndex = progress.completedQuizIds.findIndex(
      id => id.toString() === quizId.toString()
    );
    
    if (completedIndex !== -1) {
      // Remove quiz from completed list
      progress.completedQuizIds.splice(completedIndex, 1);
      
      // Deduct points (ensure points don't go negative)
      progress.points = Math.max(0, (progress.points || 0) - quizPoints);
    }
  });

  chapter.quizzes.pull(quizId);
  await course.save();

  res.status(200).json({ success: true, data: course, message: "Quiz deleted successfully" });
});

// Student: Mark video complete (no points awarded; points now only from quizzes)
export const markVideoComplete = asyncHandler(async (req, res) => {
  const { courseId, chapterId, videoId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (!course.enrolledStudents.some(s => s.toString() === req.user._id.toString())) {
    throw new ApiError(403, "Enroll in this course to track progress");
  }

  const chapter = course.chapters.id(chapterId);
  if (!chapter) throw new ApiError(404, "Chapter not found");
  const video = chapter.videos.id(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  // Keep track of completion but don't award points
  let progress = course.progress.find(p => p.studentId.toString() === req.user._id.toString());
  if (!progress) {
    progress = { studentId: req.user._id, completedVideoIds: [], completedQuizIds: [], points: 0 };
    course.progress.push(progress);
  }
  if (!progress.completedVideoIds.some(id => id.toString() === video._id.toString())) {
    progress.completedVideoIds.push(video._id);
  }
  await course.save();

  // Check for badge award
  const badgeAwarded = await checkAndAwardBadge(course, req.user._id);

  res.status(200).json({ success: true, data: { addedPoints: 0, points: progress.points, badgeAwarded }, message: "Video marked complete (no points)" });
});

// Student: Get my progress
export const getMyProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const progress = (course.progress || []).find(p => p.studentId.toString() === req.user._id.toString());
  res.status(200).json({ success: true, data: progress || { points: 0, completedVideoIds: [], completedQuizIds: [] }, message: "Progress fetched" });
});

// Public: Leaderboard for a course (top 10 by points)
export const getCourseLeaderboard = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const progresses = (course.progress || []).slice().sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 10);
  const userIds = progresses.map(p => p.studentId);
  const users = await User.find({ _id: { $in: userIds } }).select("fullName email");
  const userMap = new Map(users.map(u => [u._id.toString(), u]));

  const leaderboard = progresses.map(p => ({
    studentId: p.studentId,
    fullName: userMap.get(p.studentId.toString())?.fullName || "Unknown",
    points: p.points || 0
  }));

  res.status(200).json({ success: true, data: leaderboard, message: "Leaderboard fetched" });
});

// Add video to chapter (Admin/Faculty only)
export const addVideoToChapter = asyncHandler(async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description, isPreview } = req.body;
  const videoFile = req.file;
  
  if (!title || !videoFile) {
    throw new ApiError(400, "Title and video file are required");
  }
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only add videos to your own courses");
  }
  
  const chapter = course.chapters.id(chapterId);
  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }
  
  try {
    // Upload video to Cloudinary
    const result = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "course_videos",
    });
    
    const newVideo = {
      title,
      description: description || "",
      videoUrl: result.secure_url,
      order: chapter.videos.length,
      isPreview: isPreview || false,
    };
    
    chapter.videos.push(newVideo);
    
    // Use findByIdAndUpdate to avoid version conflicts
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { chapters: course.chapters } },
      { new: true, runValidators: true }
    );
    
    if (!updatedCourse) {
      throw new ApiError(404, "Course not found after update");
    }
    
    // Clean up local file
    if (fs.existsSync(videoFile.path)) {
      fs.unlinkSync(videoFile.path);
    }
    
    res.status(201).json({
      success: true,
      data: updatedCourse,
      message: "Video added to chapter successfully",
    });
  } catch (err) {
    if (videoFile && fs.existsSync(videoFile.path)) {
      fs.unlinkSync(videoFile.path);
    }
    console.error("Video upload error:", err);
    throw new ApiError(500, "Video upload failed", [err.message]);
  }
});

// Update course (Admin/Faculty only)
export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const updates = req.body;
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only update your own courses");
  }
  
  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) {
      course[key] = updates[key];
    }
  });
  
  await course.save();
  
  const updatedCourse = await Course.findById(courseId).populate('facultyId', 'fullName');
  
  res.status(200).json({
    success: true,
    data: updatedCourse,
    message: "Course updated successfully",
  });
});

// Delete course (Admin/Faculty only)
export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only delete your own courses");
  }
  
  await Course.findByIdAndDelete(courseId);
  
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

// Enroll student in course
export const enrollInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if already enrolled
  if (course.enrolledStudents.includes(userId)) {
    throw new ApiError(400, "Already enrolled in this course");
  }
  
  course.enrolledStudents.push(userId);
  await course.save();
  
  res.status(200).json({
    success: true,
    message: "Successfully enrolled in course",
  });
});

// Delete chapter (Admin/Faculty only)
export const deleteChapter = asyncHandler(async (req, res) => {
  const { courseId, chapterId } = req.params;
  
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only delete chapters from your own courses");
  }
  
  const chapter = course.chapters.id(chapterId);
  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }
  
  // Remove chapter
  course.chapters.pull(chapterId);
  await course.save();
  
  res.status(200).json({
    success: true,
    data: course,
    message: "Chapter deleted successfully",
  });
});

// Delete video from chapter (Admin/Faculty only)
export const deleteVideo = asyncHandler(async (req, res) => {
  const { courseId, chapterId, videoId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only delete videos from your own courses");
  }

  const chapter = course.chapters.id(chapterId);
  if (!chapter) throw new ApiError(404, "Chapter not found");

  const video = chapter.videos.id(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  // Remove video from Cloudinary
  try {
    // Extract public_id from the video URL
    const publicId = video.videoUrl
      .split('/')
      .pop()
      .split('.')[0]; // e.g., "course_videos/filename" without extension

    // You may need to include folder name if stored in a folder
    await cloudinary.uploader.destroy(`course_videos/${publicId}`, {
      resource_type: "video",
    });
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    // Optional: you can decide whether to continue deletion in DB if Cloudinary fails
  }

  // Remove video from database
  chapter.videos.pull(videoId);
  await course.save();

  res.status(200).json({
    success: true,
    data: course,
    message: "Video deleted successfully",
  });
});

