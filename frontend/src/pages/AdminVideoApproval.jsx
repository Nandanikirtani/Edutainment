import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminVideoApproval = () => {
  const [pendingVideos, setPendingVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingVideos();
  }, []);

  const fetchPendingVideos = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
      const response = await axios.get('/api/videos/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingVideos(response.data.data);
    } catch (error) {
      console.error('Error fetching pending videos:', error);
      // Handle error, e.g., redirect to login if unauthorized
      if (error.response && error.response.status === 403) {
        navigate('/login'); // Redirect to login or show an error message
      }
    }
  };

  const handleApproval = async (videoId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/videos/approve-reject',
        { videoId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingVideos(); // Refresh the list
    } catch (error) {
      console.error('Error updating video status:', error);
      // Handle error
    }
  };

  return (
    <div className="admin-video-approval-container">
      <h1>Pending Videos for Approval</h1>
      {pendingVideos.length === 0 ? (
        <p>No pending videos.</p>
      ) : (
        <div className="video-list">
          {pendingVideos.map((video) => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <video controls src={video.videoUrl} width="300"></video>
              <div className="actions">
                <button onClick={() => handleApproval(video._id, 'accepted')}>Approve</button>
                <button onClick={() => handleApproval(video._id, 'rejected')}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVideoApproval;
