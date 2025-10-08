import React, { useEffect, useState, useRef } from "react";
import Reel from "../components/Reel";
import { getSavedVideosAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function SavedReels() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const { user } = useAuth();
  const userId = user?._id || user?.data?._id || user?.user?._id || user?.id || "guest";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getSavedVideosAPI();
        setVideos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        Please login to view saved reels.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black touch-pan-y"
    >
      {videos.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-white">No saved reels yet.</div>
      ) : (
        videos.map((video, index) => (
          <div
            key={video._id}
            className="snap-start h-screen flex items-center justify-center reel-wrapper"
          >
            <Reel
              video={video}
              userId={userId}
              index={index}
              onSavedToggle={({ videoId, saved }) => {
                if (!saved) {
                  // Remove from list when unsaved
                  setVideos((prev) => prev.filter((v) => v._id !== videoId));
                }
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}
