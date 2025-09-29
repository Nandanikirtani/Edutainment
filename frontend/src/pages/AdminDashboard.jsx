import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [pendingVideos, setPendingVideos] = useState([]);
  const [rejectedVideos, setRejectedVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const token = localStorage.getItem('token');

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadingCourse, setUploadingCourse] = useState(false);
  const [myUploadedCourses, setMyUploadedCourses] = useState([]); // New state for admin's uploaded courses

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  const fetchPendingVideos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/videos/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch pending videos');
      setPendingVideos(data.data);
    } catch (err) {
      setMessage(`Error fetching pending videos: ${err.message}`);
    }
  };

  const fetchRejectedVideos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/videos/rejected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Rejected Videos API Response:", res); // Debugging line
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch rejected videos');
      setRejectedVideos(data.data);
    } catch (err) {
      setMessage(`Error fetching rejected videos: ${err.message}`);
    }
  };

  const fetchAdminUploadedCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/videos/admin/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Admin Courses API Response:", res); // Debugging line
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch uploaded courses');
      setMyUploadedCourses(data.data);
    } catch (err) {
      setMessage(`Error fetching uploaded courses: ${err.message}`);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      if (activeTab === 'pending') {
        fetchPendingVideos();
      } else if (activeTab === 'rejected') {
        fetchRejectedVideos();
      } else if (activeTab === 'myCourses') { // New tab for admin's courses
        fetchAdminUploadedCourses();
      }
    }
  }, [user, token, activeTab]);

  const handleStatusChange = async (videoId, status) => {
    let rejectionReason = '';
    if (status === 'rejected') {
      rejectionReason = prompt("Please provide a reason for rejection (optional):") || "";
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/videos/approve-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId, status, rejectionReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to ${status} video`);

      if (activeTab === 'pending') {
        fetchPendingVideos();
      } else if (activeTab === 'rejected') {
        fetchRejectedVideos();
      }
      setMessage(`Video ${status} successfully!`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleCourseUpload = async (e) => {
    e.preventDefault();
    if (!courseTitle || !courseDescription || !videoFile) {
      setMessage(`Error: Course title, description, and video file are required.`);
      return;
    }

    setUploadingCourse(true);
    setMessage("Uploading course video...");

    const formData = new FormData();
    formData.append('title', courseTitle);
    formData.append('description', courseDescription);
    formData.append('videoFile', videoFile);
    if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile);
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/videos/courses/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload course video');

      setMessage(`Course video uploaded successfully!`);
      setCourseTitle('');
      setCourseDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      // Optionally refresh a list of courses here if you implement one
    } catch (err) {
      setMessage(`Error uploading course video: ${err.message}`);
    } finally {
      setUploadingCourse(false);
    }
  };

  if (loading || (user && user.role !== 'admin')) {
    return <div className="text-center mt-20 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-500">
        Admin Dashboard
      </h1>
      {message && (
        <div className="max-w-4xl mx-auto mt-6 p-3 bg-green-700 text-green-100 rounded shadow text-center">
          {message}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-6">
        <div className="flex justify-around border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === 'pending'
                ? "text-red-400 border-b-4 border-red-400"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            Pending Videos
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === 'rejected'
                ? "text-red-400 border-b-4 border-red-400"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            Rejected Videos
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === 'courses'
                ? "text-red-400 border-b-4 border-red-400"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            Upload Course Video
          </button>
          <button
            onClick={() => setActiveTab('myCourses')}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === 'myCourses'
                ? "text-red-400 border-b-4 border-red-400"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            My Uploaded Courses
          </button>
        </div>

        {activeTab === 'pending' && (
          pendingVideos.length === 0 ? (
            <p className="text-center text-gray-400">No pending videos.</p>
          ) : (
            <div className="space-y-4">
              {pendingVideos.map(video => (
                <div
                  key={video._id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-800 rounded-lg shadow-sm"
                >
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                    <p className="text-gray-300 text-sm">Faculty: {video.facultyId?.fullName || 'Unknown Faculty'}</p>
                    <p className="text-gray-400 text-sm">Description: {video.description}</p>
                    {video.videoUrl && (
                      <video controls src={video.videoUrl} className="mt-2 w-full max-h-60 object-contain rounded-md"></video>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleStatusChange(video._id, 'accepted')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(video._id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'rejected' && (
          rejectedVideos.length === 0 ? (
            <p className="text-center text-gray-400">No rejected videos.</p>
          ) : (
            <div className="space-y-4">
              {rejectedVideos.map(video => (
                <div
                  key={video._id}
                  className="p-4 bg-gray-800 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                  <p className="text-gray-300 text-sm">Faculty: {video.facultyId?.fullName || 'Unknown Faculty'}</p>
                  <p className="text-gray-400 text-sm">Description: {video.description}</p>
                  {video.rejectionReason && (
                    <p className="text-red-400 text-sm mt-2">Reason: {video.rejectionReason}</p>
                  )}
                  {video.videoUrl && (
                    <video controls src={video.videoUrl} className="mt-2 w-full max-h-60 object-contain rounded-md"></video>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'courses' && (
          <div className="course-upload-section space-y-4">
            <h2 className="text-2xl font-bold text-white text-center">Upload New Course Video</h2>
            <form onSubmit={handleCourseUpload} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
              <div>
                <label htmlFor="courseTitle" className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="courseTitle"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="courseDescription" className="block text-gray-300 text-sm font-bold mb-2">Description:</label>
                <textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="videoFile" className="block text-gray-300 text-sm font-bold mb-2">Video File:</label>
                <input
                  type="file"
                  id="videoFile"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="thumbnailFile" className="block text-gray-300 text-sm font-bold mb-2">Thumbnail (Optional):</label>
                <input
                  type="file"
                  id="thumbnailFile"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700"
                disabled={uploadingCourse}
              >
                {uploadingCourse ? "Uploading Course..." : "Upload Course Video"}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'myCourses' && (
          <div className="my-courses-section space-y-4">
            <h2 className="text-2xl font-bold text-white text-center">My Uploaded Courses</h2>
            {myUploadedCourses.length === 0 ? (
              <p className="text-center text-gray-400">You haven't uploaded any courses yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myUploadedCourses.map(course => (
                  <div key={course._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400">No Thumbnail</div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                      <p className="text-gray-300 text-sm">Faculty: {course.facultyId?.fullName || 'Unknown Faculty'}</p>
                      <p className="text-gray-400 text-sm">{course.description}</p>
                      {course.videoUrl && (
                        <a href={course.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">Watch Video</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
