import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaQuestionCircle, FaUpload, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function FacultyDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [videoCount, setVideoCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Video file change & 90s duration check
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = url;

    video.onloadedmetadata = () => {
      if (video.duration > 90) {
        alert("❌ Video must be 90 seconds or less");
        e.target.value = null;
      } else {
        setVideoFile(file);
      }
    };
  };

  // Upload video function
  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert("❌ Please login first");
    }

    if (!videoFile || !videoTitle) {
      return alert("❌ Please provide title and video file");
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("video", videoFile);

    try {
      setUploading(true);
      setMessage("");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/videos/upload`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: 'include',
      });

      // Check for non-JSON responses
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setMessage("✅ Video uploaded successfully for admin approval!");
      setVideoFile(null);
      setVideoTitle("");
      setVideoDescription("");
      setVideoCount((prev) => prev + 1);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Quiz related functions (unchanged)
  const addQuestion = () =>
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    if (field === "question" || field === "answer") updated[index][field] = value;
    else updated[index].options[field] = value;
    setQuestions(updated);
  };

  const handleQuizUpload = async (e) => {
    e.preventDefault();
    if (!token) return alert("❌ Please login first");
    if (!quizTitle) return alert("❌ Quiz title required");

    try {
      setMessage("");
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1'}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: quizTitle, questions }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Quiz upload failed");

      setMessage("✅ Quiz uploaded successfully for admin approval!");
      setQuizTitle("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
      setQuizCount((prev) => prev + 1);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  if (loading) return <div className="text-center mt-20 text-white">Loading profile...</div>;
  if (!user)
    return <div className="text-center mt-20 text-red-400">Please login to view dashboard</div>;

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-500 tracking-wide">
        Faculty Dashboard
      </h1>

      {/* Profile Box */}
      <div className="max-w-4xl mx-auto mb-6 bg-gray-900 rounded-2xl shadow-xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 flex items-center justify-center bg-red-600 rounded-full">
          <FaUser size={40} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.data.fullName}</h2>
          <p className="text-gray-300">{user.data.role}</p>
          <p className="text-gray-400">{user.data.email}</p>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-6">
        <div className="flex justify-around border-b border-gray-700 mb-6">
          {["overview", "videos", "quiz"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === tab
                  ? "text-red-400 border-b-4 border-red-400"
                  : "text-gray-400"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <FaVideo size={30} className="text-red-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{videoCount}</h3>
                <p className="text-gray-300">Videos Uploaded</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <FaQuestionCircle size={30} className="text-green-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{quizCount}</h3>
                <p className="text-gray-300">Quizzes Uploaded</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-red-400 flex items-center gap-2">
              <FaVideo /> Upload Video (max 90s)
            </h2>
            <form onSubmit={handleVideoUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-red-400"
              />
              <textarea
                placeholder="Description"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-red-400"
              />

              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <FaUpload className="text-red-400" />
                <span className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  required
                  className="hidden"
                />
              </label>

              {videoFile && (
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="w-full rounded-lg mt-2 shadow-lg"
                />
              )}

              <button
                type="submit"
                disabled={uploading}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg transition-all ${
                  uploading
                    ? "bg-gray-600 cursor-not-allowed text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {uploading ? (
                  <span className="animate-pulse">⏳ Uploading...</span>
                ) : (
                  <>
                    <FaUpload /> Upload Video
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Quiz */}
        {activeTab === "quiz" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-2">
              <FaQuestionCircle /> Create Quiz
            </h2>
            <form onSubmit={handleQuizUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-green-400"
              />
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="border-l-4 border-green-400 p-4 rounded-lg bg-gray-800"
                >
                  <input
                    type="text"
                    placeholder={`Question ${i + 1}`}
                    value={q.question}
                    onChange={(e) => updateQuestion(i, "question", e.target.value)}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                  {q.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => updateQuestion(i, idx, e.target.value)}
                      className="w-full mb-1 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Answer"
                    value={q.answer}
                    onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                </div>
              ))}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  + Add Question
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
                >
                  <FaUpload /> Upload Quiz
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      {message && (
        <div className="max-w-3xl mx-auto mt-6 p-3 bg-green-800 text-green-100 rounded shadow text-center">
          {message}
        </div>
      )}
    </div>
  );
}
