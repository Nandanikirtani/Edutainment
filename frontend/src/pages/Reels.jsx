import React, { useEffect, useState } from 'react';

export default function Reels() {
  const [approvedVideos, setApprovedVideos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApprovedVideos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/videos/approved');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch approved videos');
        setApprovedVideos(data.data);
      } catch (err) {
        setMessage(`Error: ${err.message}`);
      }
    };
    fetchApprovedVideos();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Edutainment Reels
      </h1>
      {message && (
        <div className="max-w-4xl mx-auto mt-6 p-3 bg-red-100 text-red-800 rounded shadow text-center">
          {message}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {approvedVideos.length === 0 ? (
          <p className="text-center text-gray-600">No reels available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedVideos.map(video => (
              <div key={video._id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-auto max-h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
                  <p className="text-gray-600 text-sm">Faculty: {video.facultyId?.fullName || 'Unknown Faculty'}</p>
                  <p className="text-gray-500 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
