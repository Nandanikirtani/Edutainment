import { PendingVideo } from "../models/PendingVideo.model.js";
import { AcceptedVideo } from "../models/AcceptedVideo.model.js";
import { RejectedVideo } from "../models/RejectedVideo.model.js";
import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
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

// ===============================================
//               Course Management APIs
// ===============================================

// Helper function to check if user can manage course
const canManageCourse = (user, course) => {
  console.log("🔍 Course Management Check:");
  console.log("User ID:", user._id);
  console.log("User Role:", user.role);
  console.log("Course Faculty ID:", course.facultyId.toString());
  console.log("Is Owner:", course.facultyId.toString() === user._id.toString());
  console.log("Is Admin:", user.role === "admin");
  
  const canManage = course.facultyId.toString() === user._id.toString() || user.role === "admin";
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
  const { title, description, category, level, price, backgroundImage } = req.body;
  
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }
  
  const course = await Course.create({
    facultyId: req.user._id,
    title,
    description,
    category: category || "General",
    level: level || "Beginner",
    price: price || 0,
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
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  
  // Check if user can manage the course
  if (!canManageCourse(req.user, course)) {
    throw new ApiError(403, "You can only delete videos from your own courses");
  }
  
  const chapter = course.chapters.id(chapterId);
  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }
  
  const video = chapter.videos.id(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  
  // Remove video
  chapter.videos.pull(videoId);
  await course.save();
  
  res.status(200).json({
    success: true,
    data: course,
    message: "Video deleted successfully",
  });
});
