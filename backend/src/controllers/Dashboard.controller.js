import { User } from "../models/User.model.js";
import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Activity } from "../models/Activity.model.js";

// Get comprehensive dashboard data for student
export const getStudentDashboard = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  try {
    // Get student with badges
    const student = await User.findById(studentId).select("-password -refreshToken");
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Get all enrolled courses with progress
    const enrolledCourses = await Course.find({
      enrolledStudents: studentId,
    })
      .populate("facultyId", "fullName email")
      .lean();

    // Calculate progress and status for each course
    const coursesWithProgress = enrolledCourses.map((course) => {
      const studentProgress = course.progress?.find(
        (p) => p.studentId.toString() === studentId.toString()
      );

      // Calculate total possible points
      let totalPossiblePoints = 0;
      course.chapters.forEach((ch) => {
        (ch.quizzes || []).forEach((qz) => {
          const questionsCount = (qz.questions || []).length;
          totalPossiblePoints += questionsCount * 20;
        });
      });

      // Calculate total videos and completed videos
      const totalVideos = course.chapters.reduce(
        (sum, ch) => sum + (ch.videos?.length || 0),
        0
      );
      const completedVideos = studentProgress?.completedVideoIds?.length || 0;
      const completedQuizzes = studentProgress?.completedQuizIds?.length || 0;
      const totalQuizzes = course.chapters.reduce(
        (sum, ch) => sum + (ch.quizzes?.length || 0),
        0
      );

      // Calculate overall progress percentage
      const videoProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
      const quizProgress = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;
      const overallProgress = Math.round((videoProgress + quizProgress) / 2);

      // Determine status
      let status = "ongoing";
      if (overallProgress === 100) {
        status = "completed";
      } else if (overallProgress === 0) {
        status = "not_started";
      }

      // Get next lesson (first incomplete video)
      let nextLesson = null;
      for (const chapter of course.chapters) {
        for (const video of chapter.videos || []) {
          if (!studentProgress?.completedVideoIds?.includes(video._id)) {
            nextLesson = video.title;
            break;
          }
        }
        if (nextLesson) break;
      }

      return {
        id: course._id,
        title: course.title,
        description: course.description,
        instructor: course.facultyId?.fullName || "Unknown",
        progress: overallProgress,
        status,
        thumbnail: course.thumbnailUrl,
        backgroundImage: course.backgroundImage,
        nextLesson: nextLesson || "Course Completed",
        points: studentProgress?.points || 0,
        totalPossiblePoints,
        completedVideos,
        totalVideos,
        completedQuizzes,
        totalQuizzes,
        enrolledDate: course.createdAt,
      };
    });

    // Calculate total points across all courses
    const totalPoints = coursesWithProgress.reduce(
      (sum, course) => sum + course.points,
      0
    );

    // Get recent activity (last 10 activities)
    const recentActivity = [];
    
    // Add quiz completions from progress with dynamic timestamps
    coursesWithProgress.forEach((course) => {
      const progress = enrolledCourses
        .find((c) => c._id.toString() === course.id.toString())
        ?.progress?.find((p) => p.studentId.toString() === studentId.toString());

      if (progress?.completedQuizIds?.length > 0) {
        progress.completedQuizIds.slice(-3).forEach((quizId, index) => {
          const hoursAgo = Math.floor(Math.random() * 48) + 1; // Random 1-48 hours ago
          recentActivity.push({
            type: "quiz_completed",
            course: course.title,
            points: 20, // Assuming 20 points per quiz
            time: `${hoursAgo} hours ago`,
            date: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
          });
        });
      }
    });

    // Add badge achievements with dynamic timestamps
    (student.badges || []).slice(-3).forEach((badge) => {
      const daysAgo = Math.floor(Math.random() * 7) + 1; // Random 1-7 days ago
      recentActivity.push({
        type: "badge_earned",
        badge: `${badge.badgeType}% Completion Badge`,
        courseName: badge.courseName,
        time: `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
        date: badge.earnedAt || new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
      });
    });

    // Sort by date and limit
    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedActivity = recentActivity.slice(0, 10);

    // Generate upcoming deadlines based on enrolled courses
    const upcomingDeadlines = [];
    coursesWithProgress.slice(0, 3).forEach((course, index) => {
      if (course.status === "ongoing") {
        const daysFromNow = Math.floor(Math.random() * 14) + 3; // 3-16 days from now
        const dueDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
        
        upcomingDeadlines.push({
          type: index % 2 === 0 ? "assignment" : "quiz",
          course: course.title,
          title: index % 2 === 0 ? "Chapter Assignment" : "Module Quiz",
          due: dueDate.toISOString().split('T')[0],
          priority: daysFromNow <= 7 ? "high" : "medium",
        });
      }
    });

    // Generate announcements with dynamic content
    const announcements = [];
    
    // Add course-specific announcements
    if (coursesWithProgress.length > 0) {
      const recentCourse = coursesWithProgress[0];
      announcements.push({
        title: `New Updates in ${recentCourse.title}`,
        message: `Check out the latest content and resources added to ${recentCourse.title}!`,
        time: "2 days ago",
        important: false,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      });
    }
    
    // Add general platform announcement
    announcements.push({
      title: "Platform Enhancement Notice",
      message: "We've improved the dashboard analytics to provide you with better insights into your learning progress.",
      time: "1 week ago",
      important: true,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    });

    // Generate certificates for completed courses
    const certificates = coursesWithProgress
      .filter((course) => course.status === "completed")
      .map((course) => ({
        id: course.id,
        course: course.title,
        issuedDate: new Date().toISOString().split('T')[0],
        downloadUrl: `/api/certificates/${course.id}/${studentId}`,
      }));

    // Build weekly activity from tracking (last 7 days)
    const today = new Date();
    const start = new Date(today);
    start.setHours(0,0,0,0);
    // Generate past 7 days keys
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() - (6 - i));
      return d;
    });
    const dayKeys = days.map(d => d.toISOString().split('T')[0]);

    const activities = await Activity.find({ userId: student._id, day: { $in: dayKeys } }).lean();
    const byDay = new Map(dayKeys.map(k => [k, 0]));
    activities.forEach(a => { byDay.set(a.day, (byDay.get(a.day) || 0) + (a.secondsSpent || 0)); });
    const maxSeconds = Math.max(1, ...Array.from(byDay.values()));
    const weeklyActivity = dayKeys.map((k, idx) => {
      const secs = byDay.get(k) || 0;
      const hours = +(secs / 3600).toFixed(1);
      // Normalize to percentage against the max of the week
      const activity = Math.round((secs / maxSeconds) * 100);
      const dayName = days[idx].toLocaleDateString(undefined, { weekday: 'long' });
      return { day: dayName, activity, hoursSpent: hours };
    });

    // Prepare dashboard data
    const dashboardData = {
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role,
        totalPoints,
        totalBadges: student.badges?.length || 0,
      },
      statistics: {
        activeCourses: coursesWithProgress.filter((c) => c.status === "ongoing").length,
        completedCourses: coursesWithProgress.filter((c) => c.status === "completed").length,
        totalPoints,
        badgesEarned: student.badges?.length || 0,
      },
      enrolledCourses: coursesWithProgress,
      badges: student.badges || [],
      recentActivity: limitedActivity,
      upcomingDeadlines,
      announcements,
      certificates,
      weeklyActivity: weeklyActivity, // Use real tracked weekly activity based on Activity model
    };

    res.status(200).json(
      new apiResponse(200, dashboardData, "Dashboard data fetched successfully")
    );

  } catch (error) {
    console.error("Dashboard error:", error);
    throw new ApiError(500, "Failed to fetch dashboard data");
  }
});

// Get student's badges and achievements
export const getStudentAchievements = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  const student = await User.findById(studentId).select("badges");
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Group badges by type
  const badgeStats = {
    bronze: student.badges?.filter(b => b.badgeType === '50').length || 0,
    silver: student.badges?.filter(b => b.badgeType === '75').length || 0,
    gold: student.badges?.filter(b => b.badgeType === '90').length || 0,
  };

  // Get courses for badge context
  const courseIds = student.badges?.map(b => b.courseId) || [];
  const courses = await Course.find({ _id: { $in: courseIds } }).select("title");
  
  const badgesWithCourseInfo = (student.badges || []).map(badge => {
    const course = courses.find(c => c._id.toString() === badge.courseId.toString());
    return {
      ...badge.toObject(),
      courseTitle: course?.title || badge.courseName
    };
  });

  res.status(200).json(
    new apiResponse(200, {
      badges: badgesWithCourseInfo,
      statistics: badgeStats,
      totalBadges: student.badges?.length || 0
    }, "Achievements fetched successfully")
  );
});

// Get upcoming deadlines and schedule
export const getStudentSchedule = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // This would typically involve a separate assignments/deadlines model
  // For now, returning mock data based on enrolled courses
  const enrolledCourses = await Course.find({
    enrolledStudents: studentId,
  }).select("title");

  const mockDeadlines = [
    {
      id: 1,
      type: "assignment",
      course: enrolledCourses[0]?.title || "Course 1",
      title: "Final Project",
      description: "Submit your capstone project",
      due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      type: "quiz",
      course: enrolledCourses[1]?.title || "Course 2",
      title: "Module 3 Assessment",
      description: "Complete the end-of-module quiz",
      due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "medium",
      status: "pending"
    }
  ];

  res.status(200).json(
    new apiResponse(200, mockDeadlines, "Schedule fetched successfully")
  );
});

// Get student announcements
export const getStudentAnnouncements = asyncHandler(async (req, res) => {
  // In a real app, this would fetch from an announcements model
  // For now, returning mock data
  const announcements = [
    {
      id: 1,
      title: "New Course Available: Advanced React Patterns",
      message: "Enroll now to learn advanced React patterns and best practices!",
      type: "course_announcement",
      important: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: "System"
    },
    {
      id: 2,
      title: "Platform Update - New Features",
      message: "We've added new interactive elements to enhance your learning experience.",
      type: "system_update",
      important: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      author: "Admin Team"
    }
  ];

  res.status(200).json(
    new apiResponse(200, announcements, "Announcements fetched successfully")
  );
});

// Track activity ping (e.g., from video heartbeat)
export const recordStudentActivityPing = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { seconds = 15, courseId = null } = req.body || {};
  const sec = Number(seconds) || 0;
  if (sec <= 0) return res.status(400).json(new apiResponse(400, null, 'Invalid seconds'));

  const now = new Date();
  const day = now.toISOString().split('T')[0];

  try {
    const doc = await Activity.findOneAndUpdate(
      { userId, day, courseId },
      { $inc: { secondsSpent: sec } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.status(200).json(new apiResponse(200, { day: doc.day, secondsSpent: doc.secondsSpent }, 'Activity recorded'));
  } catch (e) {
    console.error('Activity ping error:', e);
    throw new ApiError(500, 'Failed to record activity');
  }
});

// Helper function to generate weekly activity data based on user engagement
function generateWeeklyActivity(coursesWithProgress) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return days.map((day, index) => {
    // Higher activity on weekdays if user has active courses
    const baseActivity = coursesWithProgress.length > 0 ? 30 : 10;
    const weekdayBonus = index < 5 ? 20 : 5; // Monday-Friday get bonus
    const randomVariation = Math.floor(Math.random() * 30);
    
    const activity = Math.min(100, baseActivity + weekdayBonus + randomVariation);
    const hoursSpent = Math.max(0.5, activity / 20); // Roughly convert activity to hours
    
    return {
      day,
      activity,
      hoursSpent: Math.round(hoursSpent * 10) / 10 // Round to 1 decimal
    };
  });
}
