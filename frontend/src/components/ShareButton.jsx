import React from "react";
import { shareVideoAPI } from "../api/api";

export default function ShareButton({ video }) {
  const handleShare = async () => {
    try {
      await shareVideoAPI(video._id);
      navigator.clipboard.writeText(video.videoUrl);
      alert("Video URL copied!");
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleShare}>🔗 Share</button>;
}



