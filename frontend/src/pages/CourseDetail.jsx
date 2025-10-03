import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Clock, Users, Star, BookOpen, Plus, Upload, 
  Edit, Trash2, ChevronDown, ChevronRight, Lock, Unlock, ListChecks, Trophy, Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import confetti from 'canvas-confetti';
import BadgeAwardModal from '../components/BadgeAwardModal';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  // Player state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newChapter, setNewChapter] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "", isPreview: false });
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // UI state for Course Content improvements
  const [openChapters, setOpenChapters] = useState({});
  
  // Quizzes (backend-backed) and progress
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [quizChapter, setQuizChapter] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ title: "", description: "", questions: [ { text: "", options: ["", "", "", ""], correctIndex: null } ] });
  const [showTakeQuiz, setShowTakeQuiz] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [myProgress, setMyProgress] = useState({ points: 0, completedVideoIds: [], completedQuizIds: [] });
  const [leaderboard, setLeaderboard] = useState([]);
  
  // Badge award state
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);
  const [myBadges, setMyBadges] = useState([]);

  // Handle different user data structures
  const getUserRole = () => {
    if (!user) return null;
    return user.role || user.data?.role;
  };

  const getUserId = () => {
    if (!user) return null;
    return user._id || user.data?._id;
  };

  const isAdminOrFaculty = user && (getUserRole() === "admin" || getUserRole() === "teacher");
  const isOwner = course && user && course.facultyId && course.facultyId._id === getUserId();

  // Debug logging
  useEffect(() => {
    if (course && user) {
      console.log("Course faculty ID:", course.facultyId?._id);
      console.log("User ID:", getUserId());
      console.log("User role:", getUserRole());
      console.log("Is owner:", isOwner);
      console.log("Is admin/faculty:", isAdminOrFaculty);
      console.log("Full user object:", user);
    }
  }, [course, user, isOwner, isAdminOrFaculty]);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch course");
      }
      
      console.log("📚 Course Data:", data.data);
      console.log("🖼️ Background Image:", data.data.backgroundImage);
      console.log("🖼️ Thumbnail URL:", data.data.thumbnailUrl);
      
      setCourse(data.data);
      if (data.data.chapters && data.data.chapters.length > 0) {
        setActiveChapter(data.data.chapters[0]);
        if (data.data.chapters[0].videos && data.data.chapters[0].videos.length > 0) {
          setActiveVideo(data.data.chapters[0].videos[0]);
        }
      }
      // Fetch my progress
      try {
        const progRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/progress/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const progData = await progRes.json();
        if (progRes.ok) {
          setMyProgress(progData.data || { points: 0, completedVideoIds: [], completedQuizIds: [] });
        }
      } catch (e) {
        console.warn('Progress fetch failed', e);
      }
      // Fetch leaderboard
      try {
        const lbRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/leaderboard`);
        const lbData = await lbRes.json();
        if (lbRes.ok) setLeaderboard(lbData.data || []);
      } catch (e) {
        console.warn('Leaderboard fetch failed', e);
      }
      // Fetch my badges for this course
      if (user) {
        try {
          const badgesRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/users/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          const badgesData = await badgesRes.json();
          if (badgesRes.ok && badgesData.data?.badges) {
            const courseBadges = badgesData.data.badges.filter(
              b => b.courseId.toString() === courseId
            );
            setMyBadges(courseBadges);
          }
        } catch (e) {
          console.warn('Badges fetch failed', e);
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helpers for UI
  const toggleChapter = (id) => {
    setOpenChapters(prev => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  const formatTime = (s) => {
    const total = Math.floor(s || 0);
    const m = Math.floor(total / 60);
    const sec = total % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const getTotalPoints = (course) => {
    if (!course) return 0;
    let total = 0;
    course.chapters?.forEach(ch => {
      (ch.quizzes || []).forEach(qz => {
        // 20 points per question
        const questionsCount = (qz.questions || []).length;
        const quizPoints = questionsCount * 20;
        total += quizPoints;
      });
    });
    return total;
  };

  const handleAddChapter = async (e) => {
    e.preventDefault();
    if (!newChapter.title.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newChapter),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add chapter");
      }

      setCourse(data.data);
      setNewChapter({ title: "", description: "" });
      setShowAddChapter(false);
      setSuccessMessage("Chapter added successfully!");
      setShowSuccessPopup(true);
      
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.title.trim() || !videoFile || !activeChapter) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", newVideo.title);
    formData.append("description", newVideo.description);
    formData.append("isPreview", newVideo.isPreview);
    formData.append("video", videoFile);

    try {
      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      const promise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setUploadProgress(Math.round(percentComplete));
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error occurred'));
        });

        xhr.open('POST', `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${activeChapter._id}/videos`);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("token")}`);
        xhr.send(formData);
      });

      const data = await promise;
      setCourse(data.data);
      setNewVideo({ title: "", description: "", isPreview: false });
      setVideoFile(null);
      setShowAddVideo(false);
      setSuccessMessage("Video added successfully!");
      setShowSuccessPopup(true);
      
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Add a quiz to selected chapter (backend) - supports multiple questions
  const handleAddQuiz = async (e) => {
    e.preventDefault();
    if (!quizChapter || !newQuiz.title.trim()) return;

    // Validate questions
    const questions = (newQuiz.questions || []).map((q, idx) => {
      const text = (q.text || '').trim();
      const opts = (q.options || []).map(o => (o || '').trim());
      const ci = q.correctIndex;
      if (!text) throw new Error(`Question ${idx + 1}: text is required`);
      if (opts.length < 2 || opts.some(o => !o)) throw new Error(`Question ${idx + 1}: provide at least two non-empty options`);
      if (ci == null || ci < 0 || ci >= opts.length) throw new Error(`Question ${idx + 1}: select the correct answer`);
      return { text, options: opts, correctIndex: ci };
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${quizChapter._id}/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: newQuiz.title, description: newQuiz.description, questions })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add quiz');
      setCourse(data.data);
      setNewQuiz({ title: "", description: "", questions: [ { text: "", options: ["", "", "", ""], correctIndex: null } ] });
      setShowAddQuiz(false);
      setSuccessMessage("Quiz added successfully!");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleTakeQuizSubmit = async (e) => {
    e.preventDefault();
    if (!activeQuiz || !activeChapter) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${activeChapter._id}/quizzes/${activeQuiz._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit quiz');
      const awarded = (data.data.addedPoints || 0) > 0;
      setMyProgress(prev => ({
        ...prev,
        points: data.data.points,
        completedQuizIds: awarded ? [...new Set([...(prev.completedQuizIds||[]), activeQuiz._id])] : (prev.completedQuizIds || [])
      }));
      
      // Check for badge award
      if (data.data.badgeAwarded) {
        setEarnedBadge(data.data.badgeAwarded);
        setShowBadgeModal(true);
        // Add to local badges array
        setMyBadges(prev => [...prev, {
          badgeType: data.data.badgeAwarded.badgeType,
          courseId: courseId,
          courseName: data.data.badgeAwarded.courseName,
          earnedAt: new Date()
        }]);
      }
      
      // Show results instead of closing immediately
      setQuizSubmitted(true);
      
      if (awarded) {
        setSuccessMessage(`Quiz submitted: ${data.data.correct}/${data.data.total} correct. +${data.data.addedPoints} points`);
      } else {
        setSuccessMessage(`Quiz submitted: ${data.data.correct}/${data.data.total} correct. No points awarded. Select the correct answers to earn points.`);
      }
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteQuiz = async (chapterId, quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete quiz');
      setCourse(data.data);
      setSuccessMessage("Quiz deleted successfully!");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };


  // Celebration confetti effect
  const triggerCelebration = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Red and black themed confetti
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#DC2626', '#EF4444', '#991B1B', '#FCA5A5', '#FFFFFF']
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#DC2626', '#EF4444', '#991B1B', '#FCA5A5', '#FFFFFF']
      }));
    }, 250);
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to enroll");
      }

      // Trigger celebration animation
      triggerCelebration();
      
      setSuccessMessage("🎉 Successfully enrolled in course! 🎉");
      setShowSuccessPopup(true);
      fetchCourse(); // Refresh course data
      
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!window.confirm("Are you sure you want to delete this chapter? This will also delete all videos in this chapter.")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${chapterId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete chapter");
      }

      setSuccessMessage("Chapter deleted successfully!");
      setShowSuccessPopup(true);
      fetchCourse(); // Refresh course data
      
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDeleteVideo = async (chapterId, videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${chapterId}/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete video");
      }

      setSuccessMessage("Video deleted successfully!");
      setShowSuccessPopup(true);
      fetchCourse(); // Refresh course data
      
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const isEnrolled = course && user && course.enrolledStudents.some(student => student._id === getUserId());

  // Permissions: only students watching their enrolled course get full videos; others only preview
  const isStudent = user && getUserRole() === 'student';
  const canWatchFull = isStudent && isEnrolled;
  const canWatchThisVideo = canWatchFull || (!!activeVideo && activeVideo.isPreview);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-red-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 border border-green-500"
          >
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">{successMessage}</span>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-96"
        style={{
          backgroundImage: `url('${
            course.backgroundImage?.startsWith('http') 
              ? course.backgroundImage 
              : course.backgroundImage 
                ? `${import.meta.env.BASE_URL}${course.backgroundImage.replace(/^\//, '')}` 
                : course.thumbnailUrl?.startsWith('http') 
                  ? course.thumbnailUrl 
                  : course.thumbnailUrl 
                    ? `${import.meta.env.BASE_URL}${course.thumbnailUrl.replace(/^\//, '')}` 
                    : ''
          }')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-950/50 to-black/80"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent animate-pulse"
            >
              {course.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed"
            >
              {course.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-red-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-700/50"
              >
                <Clock className="w-4 h-4 text-red-400" />
                <span>{course.duration} minutes</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-red-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-700/50"
              >
                <Users className="w-4 h-4 text-red-400" />
                <span>{course.enrolledStudents.length} students</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-red-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-700/50"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{course.rating.toFixed(1)} ({course.totalRatings})</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-red-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-700/50"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Points: {getTotalPoints(course)}{isEnrolled && ` (You: ${myProgress.points || 0})`}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Course Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          {!isEnrolled && user && getUserRole() === "student" && (
            <motion.button
              onClick={handleEnroll}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 px-8 py-4 rounded-lg font-bold flex items-center gap-2 overflow-hidden group shadow-lg shadow-red-900/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="relative z-10">Enroll Now</span>
              <BookOpen className="w-5 h-5 animate-bounce" />
            </motion.button>
          )}
          
          {isEnrolled && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-green-900/50"
            >
              <Unlock className="w-5 h-5 animate-pulse" />
              <span>✓ Enrolled</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )}

          {(isOwner || getUserRole() === "admin") && (
            <button
              onClick={() => setShowAddChapter(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Chapter
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-600 text-white rounded-lg">
            {message}
          </div>
        )}

        {/* Debug Info for Admin */}
        {getUserRole() === "admin" && (
          <div className="mb-6 p-4 bg-blue-600 text-white rounded-lg">
            <p>Admin Debug: You can manage this course</p>
            <p>User ID: {getUserId()}</p>
            <p>Course Faculty ID: {course?.facultyId?._id}</p>
            <p>Is Owner: {isOwner ? "Yes" : "No"}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player - Main Screen */}
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 rounded-lg overflow-hidden shadow-2xl shadow-red-900/20 border border-red-900/30">
                <div className="aspect-video bg-black relative group">
                  {/* Video element (native controls hidden; custom controls below) */}
                  <video
                    key={`${activeVideo?._id}-${canWatchThisVideo ? 'allowed' : 'locked'}`}
                    ref={videoRef}
                    className={`w-full h-full object-contain ${!canWatchThisVideo ? 'blur-sm' : ''}`}
                    src={canWatchThisVideo ? activeVideo.videoUrl : ''}
                    poster={course.thumbnailUrl}
                    preload="metadata"
                    controls={false}
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    onLoadedMetadata={(e) => {
                      const dur = Math.round(e.currentTarget?.duration || 0);
                      setDuration(dur);
                      if (dur && (!activeVideo.duration || activeVideo.duration !== dur)) {
                        setActiveVideo(prev => (prev ? { ...prev, duration: dur } : prev));
                      }
                    }}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onEnded={async () => {
                      setIsPlaying(false);
                      if (canWatchFull && activeChapter && activeVideo) {
                        try {
                          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses/${courseId}/chapters/${activeChapter._id}/videos/${activeVideo._id}/complete`, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                          });
                          const data = await res.json();
                          if (res.ok && data.data?.badgeAwarded) {
                            setEarnedBadge(data.data.badgeAwarded);
                            setShowBadgeModal(true);
                            setMyBadges(prev => [...prev, {
                              badgeType: data.data.badgeAwarded.badgeType,
                              courseId: courseId,
                              courseName: data.data.badgeAwarded.courseName,
                              earnedAt: new Date()
                            }]);
                          }
                        } catch (e) {
                          // ignore
                        }
                      }
                    }}
                  />

                  {/* Overlay when locked */}
                  {!canWatchThisVideo && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center p-6">
                      <Lock className="w-10 h-10 text-gray-300 mb-3" />
                      <p className="text-white font-semibold mb-2">Login and Enroll to watch this video</p>
                      <p className="text-gray-300 text-sm mb-4">This is a locked lesson. {activeVideo?.isPreview ? 'Preview is available' : 'Preview only for selected videos'}.</p>
                      <div className="flex gap-3">
                        {!user && (
                          <button onClick={() => navigate('/login')} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700">Login</button>
                        )}
                        {user && !isEnrolled && getUserRole() === 'student' && (
                          <button onClick={handleEnroll} className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black">Enroll Now</button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Center Play/Pause */}
                  {canWatchThisVideo && (
                    <button
                      onClick={() => {
                        const v = videoRef.current; if (!v) return; if (v.paused) { v.play(); setIsPlaying(true); } else { v.pause(); setIsPlaying(false); }
                      }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Toggle Play"
                    >
                      <div className="bg-black/50 p-4 rounded-full">
                        {isPlaying ? (
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z"/></svg>
                        ) : (
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6V4z"/></svg>
                        )}
                      </div>
                    </button>
                  )}

                  {/* Control Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 space-y-2">
                    {/* Progress */}
                    <input
                      type="range"
                      min={0}
                      max={Math.max(1, duration)}
                      value={Math.min(currentTime, duration)}
                      onChange={(e) => {
                        const v = videoRef.current; if (!v) return; const t = Number(e.target.value); v.currentTime = t; setCurrentTime(t);
                      }}
                      className="w-full accent-red-600"
                    />
                    <div className="flex items-center gap-3 text-white text-xs">
                      {/* Play/Pause */}
                      <button
                        onClick={() => { const v = videoRef.current; if (!v) return; if (v.paused) { v.play(); setIsPlaying(true); } else { v.pause(); setIsPlaying(false); }}}
                        className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>

                      {/* Time */}
                      <span>{formatTime(canWatchThisVideo ? currentTime : 0)} / {formatTime(duration || activeVideo?.duration || 0)}</span>

                      {/* Volume */}
                      <button onClick={() => { const v = videoRef.current; if (!v) return; v.muted = !v.muted; setIsMuted(v.muted); }} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">
                        {isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                      </button>
                      <input type="range" min={0} max={1} step={0.01} value={volume}
                        onChange={(e)=>{ const v=videoRef.current; if(!v) return; const val=Number(e.target.value); v.volume=val; setVolume(val); if(val>0) { v.muted=false; setIsMuted(false);} }}
                        className="w-24 accent-red-600"
                      />

                      {/* Speed */}
                      <select value={playbackRate} onChange={(e)=>{ const v=videoRef.current; if(!v) return; const rate=Number(e.target.value); v.playbackRate=rate; setPlaybackRate(rate); }} className="bg-white/10 hover:bg-white/20 rounded px-2 py-1">
                        {[0.5,1,1.25,1.5,2].map(r=> <option key={r} value={r}>{r}x</option>)}
                      </select>

                      {/* Seek +/- */}
                      <button onClick={()=>{ const v=videoRef.current; if(!v) return; v.currentTime=Math.max(0, v.currentTime-10); }} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">-10s</button>
                      <button onClick={()=>{ const v=videoRef.current; if(!v) return; v.currentTime=Math.min(duration, v.currentTime+10); }} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">+10s</button>

                      {/* Fullscreen */}
                      <button onClick={() => { const el=videoRef.current; if(!el) return; if (el.requestFullscreen) el.requestFullscreen(); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); }} className="ml-auto px-2 py-1 rounded bg-white/10 hover:bg-white/20">Fullscreen</button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{activeVideo.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{activeVideo.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatTime(activeVideo?.duration || duration || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center h-96 flex flex-col items-center justify-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Select a video to start watching</p>
              </div>
            )}
          </div>

          {/* Course Content - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* My Progress */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 rounded-lg p-4 border border-red-900/40 shadow-lg shadow-red-900/10"
              >
                <h3 className="text-lg font-semibold mb-2 text-red-400 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  My Progress
                </h3>
                <p className="text-sm text-gray-300">Points: <span className="font-bold text-yellow-400">{myProgress.points || 0}</span></p>
                <p className="text-sm text-gray-300">Quizzes: <span className="font-bold text-green-400">{myProgress.completedQuizIds?.length || 0}</span> / {course.chapters?.reduce((sum, ch) => sum + (ch.quizzes?.length || 0), 0)}</p>
              </motion.div>

              {/* My Badges */}
              {isEnrolled && myBadges.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-900 via-yellow-950/20 to-gray-900 rounded-lg p-4 border border-yellow-600/40 shadow-lg shadow-yellow-900/10"
                >
                  <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    My Badges ({myBadges.length})
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {myBadges.sort((a, b) => parseInt(b.badgeType) - parseInt(a.badgeType)).map((badge, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 * idx, type: "spring" }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={`/Badge-${badge.badgeType}.${badge.badgeType === '50' ? 'jpeg' : 'jpg'}`}
                          alt={`${badge.badgeType}% Badge`}
                          className="w-20 h-20 object-contain rounded-lg drop-shadow-lg"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                        >
                          {badge.badgeType}% Complete
                        </motion.div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Keep going to unlock more badges! 🏆
                  </p>
                </motion.div>
              )}

              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 rounded-lg p-4 border border-red-900/40 shadow-lg shadow-red-900/10"
              >
                <h3 className="text-lg font-semibold mb-3 text-red-400 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Leaderboard
                </h3>
                {leaderboard.length === 0 ? (
                  <p className="text-sm text-gray-400">No entries yet</p>
                ) : (
                  <ul className="space-y-2">
                    {leaderboard.map((row, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{idx + 1}. {row.fullName}</span>
                        <span className="text-yellow-400 font-semibold">{row.points} pts</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              <h2 className="text-2xl font-bold mb-6 text-red-400">Course Content</h2>
            
            {course.chapters.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No chapters available yet</p>
                {(isOwner || getUserRole() === "admin") && (
                  <button
                    onClick={() => setShowAddChapter(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  >
                    Add First Chapter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {course.chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 rounded-lg overflow-hidden border border-red-900/30 shadow-lg shadow-red-900/10"
                  >
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleChapter(chapter._id)}
                          className="flex items-center gap-3 group"
                        >
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${ (openChapters[chapter._id] ?? true) ? '' : '-rotate-90' }`} />
                          <h3 className="text-lg font-semibold group-hover:text-white">{chapter.title}</h3>
                          <span className="text-sm text-gray-400">
                            {chapter.videos.length} videos • {formatTime(chapter.videos.reduce((s, v) => s + (v.duration || 0), 0))} • {(chapter.quizzes?.length || 0)} quizzes
                          </span>
                        </button>
                        {(isOwner || getUserRole() === "admin") && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActiveChapter(chapter);
                                setShowAddVideo(true);
                              }}
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              
                            </button>
                            <button
                              onClick={() => handleDeleteChapter(chapter._id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              
                            </button>
                          </div>
                        )}
                      </div>
                      {chapter.description && (
                        <p className="text-gray-400 text-sm mt-2">{chapter.description}</p>
                      )}
                    </div>
                    
                    <div className={`p-4 ${ (openChapters[chapter._id] ?? true) ? '' : 'hidden' }`}>
                      {chapter.videos.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <p>No videos in this chapter</p>
                          {(isOwner || getUserRole() === "admin") && (
                            <button
                              onClick={() => {
                                setActiveChapter(chapter);
                                setShowAddVideo(true);
                              }}
                              className="mt-2 text-blue-400 hover:text-blue-300"
                            >
                              Add First Video
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {chapter.videos.map((video, videoIndex) => (
                            <div
                              key={video._id}
                              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                activeVideo && activeVideo._id === video._id
                                  ? "bg-red-600"
                                  : "bg-gray-800 hover:bg-gray-700"
                              }`}
                              onClick={() => {
                                const allowed = canWatchFull || video.isPreview;
                                if (!allowed) {
                                  setMessage('Please login and enroll to watch this lesson.');
                                  return;
                                }
                                setActiveVideo(video);
                                setDuration(video?.duration || 0);
                                setCurrentTime(0);
                                setIsPlaying(false);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4" />
                                <div>
                                  <p className="font-medium">{video.title}</p>
                                  {video.isPreview && (
                                    <span className="text-xs bg-yellow-600 text-black px-2 py-1 rounded">
                                      Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">
                                  {video.duration 
                                    ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` 
                                    : '--:--'
                                  }
                                </span>
                                {!isEnrolled && !video.isPreview && (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                )}
                                {(isOwner || getUserRole() === "admin") && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteVideo(chapter._id, video._id);
                                    }}
                                    className="text-red-400 hover:text-red-300 ml-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Quizzes panel */}
                      <div className="mt-4 border-t border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-md font-semibold flex items-center gap-2"><ListChecks className="w-4 h-4" /> Quizzes</h4>
                          {(isOwner || getUserRole() === "admin") && (
                            <button
                              onClick={() => { setQuizChapter(chapter); setShowAddQuiz(true); }}
                              className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" /> Add Quiz
                            </button>
                          )}
                        </div>
                        { (chapter.quizzes?.length || 0) === 0 ? (
                          <p className="text-sm text-gray-400">No quizzes yet.</p>
                        ) : (
                          <ul className="space-y-2">
                            {chapter.quizzes.map((quiz) => {
                              const quizTotalPoints = (quiz.questions || []).length * 20;
                              return (
                              <li key={quiz._id} className="bg-gray-800 rounded p-3 flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{quiz.title}</p>
                                  {quiz.description && <p className="text-xs text-gray-400">{quiz.description}</p>}
                                  <p className="text-xs text-yellow-400 mt-1">{(quiz.questions || []).length} questions • {quizTotalPoints} points</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getUserRole() === "student" && (
                                    <button
                                      onClick={() => { 
                                        setActiveChapter(chapter); 
                                        setActiveQuiz(quiz); 
                                        setAnswers(new Array((quiz.questions||[]).length).fill(null)); 
                                        setQuizSubmitted(false);
                                        setShowTakeQuiz(true); 
                                      }}
                                      disabled={myProgress.completedQuizIds?.includes(quiz._id)}
                                      className={`text-sm px-3 py-1 rounded ${myProgress.completedQuizIds?.includes(quiz._id) ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700 text-black'}`}
                                    >
                                      {myProgress.completedQuizIds?.includes(quiz._id) ? 'Completed' : `Take Quiz +${(quiz.questions || []).length * 20}`}
                                    </button>
                                  )}
                                  {(isOwner || getUserRole() === "admin") && (
                                    <button
                                      onClick={() => handleDeleteQuiz(chapter._id, quiz._id)}
                                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                                      title="Delete Quiz"
                                    >
                                      <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                  )}
                                </div>
                              </li>
                            );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Chapter Modal */}
      <AnimatePresence>
        {showAddChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddChapter(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add New Chapter</h3>
              <form onSubmit={handleAddChapter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Chapter Title</label>
                  <input
                    type="text"
                    value={newChapter.title}
                    onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newChapter.description}
                    onChange={(e) => setNewChapter({ ...newChapter, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddChapter(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Add Chapter
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Video Modal */}
      <AnimatePresence>
        {showAddVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add Video to Chapter</h3>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPreview"
                    checked={newVideo.isPreview}
                    onChange={(e) => setNewVideo({ ...newVideo, isPreview: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isPreview" className="text-sm">Make this a preview video (free for all students)</label>
                </div>
                
                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading video...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 text-center">
                      Please don't close this window while uploading
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddVideo(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`flex-1 px-4 py-2 rounded-lg ${
                      isUploading 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Add Video'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Quiz Modal */}
      <AnimatePresence>
        {showAddQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto pr-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add Quiz to Chapter</h3>
              <form onSubmit={handleAddQuiz} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quiz Title</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>

                {/* Questions builder */}
                <div className="space-y-4">
                  {newQuiz.questions.map((q, qi) => (
                    <div key={qi} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Question {qi + 1}</h4>
                        {newQuiz.questions.length > 1 && (
                          <button type="button" onClick={() => {
                            const next = newQuiz.questions.filter((_, idx) => idx !== qi);
                            setNewQuiz({ ...newQuiz, questions: next });
                          }} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) => {
                          const next = [...newQuiz.questions];
                          next[qi] = { ...next[qi], text: e.target.value };
                          setNewQuiz({ ...newQuiz, questions: next });
                        }}
                        placeholder="Enter question text"
                        className="w-full mb-3 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oi) => (
                          <label key={oi} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-q${qi}`}
                              checked={q.correctIndex === oi}
                              onChange={() => {
                                const next = [...newQuiz.questions];
                                next[qi] = { ...next[qi], correctIndex: oi };
                                setNewQuiz({ ...newQuiz, questions: next });
                              }}
                              className="w-4 h-4"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const next = [...newQuiz.questions];
                                const ops = [...next[qi].options];
                                ops[oi] = e.target.value;
                                next[qi] = { ...next[qi], options: ops };
                                setNewQuiz({ ...newQuiz, questions: next });
                              }}
                              placeholder={`Option ${oi + 1}`}
                              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, { text: "", options: ["", "", "", ""], correctIndex: null }] })}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    + Add another question
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddQuiz(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                  >
                    Create Quiz
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Take Quiz Modal */}
      <AnimatePresence>
        {showTakeQuiz && activeQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowTakeQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">{activeQuiz.title}</h3>
              {activeQuiz.description && <p className="text-gray-400 mb-4">{activeQuiz.description}</p>}
              <form onSubmit={handleTakeQuizSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {(activeQuiz.questions || []).map((q, qi) => (
                  <div key={qi} className="bg-gray-800 rounded p-4">
                    <p className="font-semibold mb-3">Q{qi + 1}. {q.text}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oi) => {
                        // Determine border color after submission
                        let borderClass = 'border-gray-700';
                        let bgClass = 'bg-gray-900';
                        
                        if (quizSubmitted) {
                          // Show correct answer in green
                          if (oi === q.correctIndex) {
                            borderClass = 'border-green-500';
                            bgClass = 'bg-green-900/30';
                          }
                          // Show selected wrong answer in red
                          else if (answers[qi] === oi && oi !== q.correctIndex) {
                            borderClass = 'border-red-500';
                            bgClass = 'bg-red-900/30';
                          }
                        } else {
                          // Before submission, show selected option in blue
                          if (answers[qi] === oi) {
                            borderClass = 'border-blue-500';
                            bgClass = 'bg-blue-600/20';
                          }
                        }
                        
                        return (
                          <label key={oi} className={`flex items-center gap-2 p-2 rounded ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'} ${bgClass} border ${borderClass}`}>
                            <input
                              type="radio"
                              name={`q-${qi}`}
                              checked={answers[qi] === oi}
                              onChange={() => {
                                if (!quizSubmitted) {
                                  const next = [...answers];
                                  next[qi] = oi;
                                  setAnswers(next);
                                }
                              }}
                              disabled={quizSubmitted}
                              className="w-4 h-4"
                            />
                            <span>{opt}</span>
                            {quizSubmitted && oi === q.correctIndex && (
                              <span className="ml-auto text-green-400 text-sm font-semibold">✓ Correct</span>
                            )}
                            {quizSubmitted && answers[qi] === oi && oi !== q.correctIndex && (
                              <span className="ml-auto text-red-400 text-sm font-semibold">✗ Wrong</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  {quizSubmitted ? (
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowTakeQuiz(false);
                        setQuizSubmitted(false);
                        setAnswers([]);
                      }} 
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Close
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={() => setShowTakeQuiz(false)} className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">Cancel</button>
                      <button type="submit" className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg">Submit Quiz</button>
                    </>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Award Modal */}
      <BadgeAwardModal 
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badge={earnedBadge}
      />
    </div>
  );
};

export default CourseDetail;