import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { likeVideoAPI } from "../api/api";

export default function LikeButton({ video, userId }) {
  const [likes, setLikes] = useState(video.likes || 0);
  const [liked, setLiked] = useState(video.likedBy?.includes(userId));
  const [showHeart, setShowHeart] = useState(false);

  const handleLike = async () => {
    try {
      const res = await likeVideoAPI(video._id);
      setLikes(res.likes);
      setLiked(res.likedBy.includes(userId));

      // Show animated heart
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex items-center">
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={handleLike}
        className="flex items-center space-x-1 text-white"
      >
        <Heart className={`h-6 w-6 ${liked ? "text-red-500" : "text-white"}`} />
        <span>{likes}</span>
      </motion.button>

      {/* Animated big heart on click */}
      {showHeart && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-3 -left-3 text-red-500 pointer-events-none"
        >
          <Heart className="h-10 w-10" />
        </motion.div>
      )}
    </div>
  );
}
