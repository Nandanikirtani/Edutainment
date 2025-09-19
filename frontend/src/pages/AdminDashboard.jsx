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
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch rejected videos');
      setRejectedVideos(data.data);
    } catch (err) {
      setMessage(`Error fetching rejected videos: ${err.message}`);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      if (activeTab === 'pending') {
        fetchPendingVideos();
      } else if (activeTab === 'rejected') {
        fetchRejectedVideos();
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
      </div>
    </div>
  );
}
