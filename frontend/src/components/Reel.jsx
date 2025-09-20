// import React, { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
// import {
//   likeVideoAPI,
//   saveVideoAPI,
//   shareVideoAPI,
//   commentVideoAPI,
// } from "../api/api";

// export default function Reel({ video, userId, index }) {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [likes, setLikes] = useState(video.likes || 0);
//   const [liked, setLiked] = useState(video.likedBy?.includes(userId));
//   const [saved, setSaved] = useState(video.savedBy?.includes(userId));
//   const [comments, setComments] = useState(video.comments || []);
//   const [commentText, setCommentText] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const [showHeart, setShowHeart] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const vid = entry.target.querySelector("video");
//           if (vid) {
//             if (entry.isIntersecting) vid.play();
//             else vid.pause();
//           }
//         });
//       },
//       { threshold: 0.7 }
//     );

//     observer.observe(videoRef.current.parentElement);
//     return () => observer.disconnect();
//   }, []);

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) videoRef.current.pause();
//     else videoRef.current.play();
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = !videoRef.current.muted;
//     setIsMuted(videoRef.current.muted);
//   };

//   const handleLike = async () => {
//     try {
//       const res = await likeVideoAPI(video._id);
//       setLikes(res.likes);
//       setLiked(res.likedBy.includes(userId));
//       setShowHeart(true);
//       setTimeout(() => setShowHeart(false), 800);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const res = await saveVideoAPI(video._id);
//       setSaved(res.savedBy.includes(userId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await shareVideoAPI(video._id);
//       await navigator.clipboard.writeText(window.location.href + `?video=${video._id}`);
//       alert("📋 Link copied!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await commentVideoAPI(video._id, commentText);
//       setComments(res.comments);
//       setCommentText("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="relative h-[95%] w-full flex items-center justify-center">
//       {/* Video */}
//       <video
//         ref={videoRef}
//         src={video.videoUrl}
//         className="h-full max-h-[1920px] aspect-[9/16] object-cover rounded-lg"
//         loop
//         playsInline
//         onClick={togglePlay}
//         muted={isMuted}
//       />

//       {/* Heart pop animation */}
//       {showHeart && (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1.5, opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 flex items-center justify-center text-red-500 text-6xl pointer-events-none"
//         >
//           <Heart />
//         </motion.div>
//       )}

//       {/* Subtle gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none"></div>

//       {/* Right buttons */}
//       <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 text-white z-20">
//         <motion.button whileTap={{ scale: 1.3 }} onClick={handleLike} className="flex flex-col items-center">
//           <Heart className={`h-8 w-8 ${liked ? "text-red-500" : "text-white"}`} />
//           <span className="text-sm">{likes}</span>
//         </motion.button>

//         <motion.button whileTap={{ scale: 1.3 }} onClick={() => setShowComments(true)} className="flex flex-col items-center">
//           <MessageCircle className="h-8 w-8" />
//           <span className="text-sm">{comments.length}</span>
//         </motion.button>

//         <motion.button whileTap={{ scale: 1.3 }} onClick={handleSave} className="flex flex-col items-center">
//           <Bookmark className={`h-8 w-8 ${saved ? "text-yellow-400" : "text-white"}`} />
//         </motion.button>

//         <motion.button whileTap={{ scale: 1.3 }} onClick={handleShare} className="flex flex-col items-center">
//           <Share2 className="h-8 w-8" />
//         </motion.button>

//         <button onClick={toggleMute} className="text-white mt-2">{isMuted ? "🔇" : "🔊"}</button>
//       </div>

//       {/* Caption */}
//       <div className="absolute bottom-6 left-6 text-white max-w-[70%] z-20">
//         <h3 className="font-bold text-lg">{video.facultyId?.fullName || "Unknown"}</h3>
//         <p className="text-sm">{video.title}</p>
//         {video.description && <p className="text-xs mt-1 text-gray-300">{video.description}</p>}
//       </div>

//       {/* Comment modal */}
//       {showComments && (
//         <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-end z-30">
//           <div className="bg-white rounded-t-2xl p-4 h-1/2 overflow-y-auto">
//             <h2 className="text-lg font-bold mb-3">Comments</h2>
//             {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
//             <div className="space-y-2">
//               {comments.map((c, i) => (
//                 <div key={i} className="border-b pb-1">
//                   <span className="font-semibold">{c.userId?.fullName || "User"}:</span> {c.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bg-gray-100 p-3 flex items-center gap-2">
//             <input
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Write a comment..."
//               className="flex-1 border px-3 py-2 rounded-full"
//             />
//             <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-full">
//               Post
//             </button>
//             <button onClick={() => setShowComments(false)} className="text-red-500 ml-2">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }














import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import {
  likeVideoAPI,
  saveVideoAPI,
  shareVideoAPI,
  commentVideoAPI,
} from "../api/api";

export default function Reel({ video, userId, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState(video.likes || 0);
  const [liked, setLiked] = useState(video.likedBy?.includes(userId));
  const [saved, setSaved] = useState(video.savedBy?.includes(userId));
  const [comments, setComments] = useState(video.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Auto play/pause when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target.querySelector("video");
          if (vid) {
            if (entry.isIntersecting) vid.play();
            else vid.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(videoRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleLike = async () => {
    try {
      const res = await likeVideoAPI(video._id);
      setLikes(res.likes);
      setLiked(res.likedBy.includes(userId));
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await saveVideoAPI(video._id);
      setSaved(res.savedBy.includes(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    try {
      await shareVideoAPI(video._id);
      await navigator.clipboard.writeText(window.location.href + `?video=${video._id}`);
      alert("📋 Link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await commentVideoAPI(video._id, commentText);
      setComments(res.comments);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-[95%] w-full flex items-center justify-center bg-black">
      {/* Video container to fit video properly */}
      <div className="relative w-full max-w-[420px] h-full flex items-center justify-center overflow-hidden rounded-lg">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="max-h-full max-w-full object-contain"
          loop
          playsInline
          onClick={togglePlay}
          muted={isMuted}
        />

        {/* Animated heart */}
        {showHeart && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-red-500 text-6xl pointer-events-none"
          >
            <Heart />
          </motion.div>
        )}
      </div>

      {/* Right buttons */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 text-white z-20">
        <motion.button whileTap={{ scale: 1.3 }} onClick={handleLike} className="flex flex-col items-center">
          <Heart className={`h-8 w-8 ${liked ? "text-red-500" : "text-white"}`} />
          <span className="text-sm">{likes}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 1.3 }} onClick={() => setShowComments(true)} className="flex flex-col items-center">
          <MessageCircle className="h-8 w-8" />
          <span className="text-sm">{comments.length}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 1.3 }} onClick={handleSave} className="flex flex-col items-center">
          <Bookmark className={`h-8 w-8 ${saved ? "text-yellow-400" : "text-white"}`} />
        </motion.button>

        <motion.button whileTap={{ scale: 1.3 }} onClick={handleShare} className="flex flex-col items-center">
          <Share2 className="h-8 w-8" />
        </motion.button>

        <button onClick={toggleMute} className="text-white mt-2">{isMuted ? "🔇" : "🔊"}</button>
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-6 text-white max-w-[70%] z-20">
        <h3 className="font-bold text-lg">{video.facultyId?.fullName || "Unknown"}</h3>
        <p className="text-sm">{video.title}</p>
        {video.description && <p className="text-xs mt-1 text-gray-300">{video.description}</p>}
      </div>

      {/* Comments modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-end z-30">
          <div className="bg-white rounded-t-2xl p-4 h-1/2 overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">Comments</h2>
            {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
            <div className="space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="border-b pb-1">
                  <span className="font-semibold">{c.userId?.fullName || "User"}:</span> {c.text}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 p-3 flex items-center gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border px-3 py-2 rounded-full"
            />
            <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Post
            </button>
            <button onClick={() => setShowComments(false)} className="text-red-500 ml-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
