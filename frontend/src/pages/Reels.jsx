import React, { useEffect, useState, useRef } from "react";
import Reel from "../components/Reel";
import { getAcceptedVideosAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Reels() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const { user } = useAuth();
  const userId = user?._id || user?.data?._id || user?.user?._id || user?.id || "guest";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAcceptedVideosAPI();
        setVideos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black touch-pan-y"
    >
      {videos.map((video, index) => (
        <div
          key={video._id}
          className="snap-start h-screen flex items-center justify-center reel-wrapper"
        >
          <Reel video={video} userId={userId} index={index} />
        </div>
      ))}
    </div>
  );
}
