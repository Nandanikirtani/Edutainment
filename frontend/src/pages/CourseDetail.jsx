import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Clock, Users, Star, BookOpen, Plus, Upload, 
  Edit, Trash2, ChevronDown, ChevronRight, Lock, Unlock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
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
      
      setCourse(data.data);
      if (data.data.chapters && data.data.chapters.length > 0) {
        setActiveChapter(data.data.chapters[0]);
        if (data.data.chapters[0].videos && data.data.chapters[0].videos.length > 0) {
          setActiveVideo(data.data.chapters[0].videos[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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

      setSuccessMessage("Successfully enrolled in course!");
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
    <div className="min-h-screen bg-black text-white">
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
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${course.backgroundImage || course.thumbnailUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg md:text-xl mb-6">{course.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{course.enrolledStudents.length} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{course.rating.toFixed(1)} ({course.totalRatings})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          {!isEnrolled && user && getUserRole() === "student" && (
            <button
              onClick={handleEnroll}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Enroll Now
            </button>
          )}
          
          {isEnrolled && (
            <div className="bg-green-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
              <Unlock className="w-5 h-5" />
              Enrolled
            </div>
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
          {/* Course Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            
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
                    className="bg-gray-900 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                          <h3 className="text-lg font-semibold">{chapter.title}</h3>
                          <span className="text-sm text-gray-400">
                            {chapter.videos.length} videos
                          </span>
                        </div>
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
                              Add Video
                            </button>
                            <button
                              onClick={() => handleDeleteChapter(chapter._id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Chapter
                            </button>
                          </div>
                        )}
                      </div>
                      {chapter.description && (
                        <p className="text-gray-400 text-sm mt-2">{chapter.description}</p>
                      )}
                    </div>
                    
                    <div className="p-4">
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
                              onClick={() => setActiveVideo(video)}
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
                                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
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
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Video Player Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {activeVideo ? (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-black relative">
                    <video
                      controls
                      className="w-full h-full object-contain"
                      src={activeVideo.videoUrl}
                      poster={course.thumbnailUrl}
                      onLoadedMetadata={(e) => {
                        // Set video duration if not already set
                        if (!activeVideo.duration && e.target.duration) {
                          // This would need to be handled by updating the video in the database
                          console.log("Video duration:", e.target.duration);
                        }
                      }}
                    />
                    {/* Fullscreen button */}
                    <button
                      onClick={() => {
                        const video = document.querySelector('video');
                        if (video.requestFullscreen) {
                          video.requestFullscreen();
                        } else if (video.webkitRequestFullscreen) {
                          video.webkitRequestFullscreen();
                        } else if (video.msRequestFullscreen) {
                          video.msRequestFullscreen();
                        }
                      }}
                      className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded hover:bg-opacity-70 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{activeVideo.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{activeVideo.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>
                        {Math.floor(activeVideo.duration / 60)}:{(activeVideo.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-8 text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Select a video to start watching</p>
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
    </div>
  );
};

export default CourseDetail;
