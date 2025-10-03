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

function formatCount(n) {
  const num = Number(n || 0);
  if (num < 1000) return String(num);
  if (num < 1e6) return (num / 1e3).toFixed(num % 1e3 === 0 ? 0 : 1) + "k";
  if (num < 1e9) return (num / 1e6).toFixed(num % 1e6 === 0 ? 0 : 1) + "M";
  return (num / 1e9).toFixed(1) + "B";
}

export default function Reel({ video, userId, index, onSavedToggle }) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const initialLikes = typeof video.likes === 'number' ? video.likes : (Array.isArray(video.likedBy) ? video.likedBy.length : (video.likesCount || 0));
  const initialLiked = Array.isArray(video.likedBy) ? video.likedBy.includes(userId) : !!video.liked;
  const initialSaved = Array.isArray(video.savedBy) ? video.savedBy.includes(userId) : !!video.saved;
  const initialComments = Array.isArray(video.comments) ? video.comments : [];
  const initialShares = typeof video.shares === 'number' ? video.shares : (video.shareCount || 0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(initialSaved);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // default muted for autoplay reliability
  const [shares, setShares] = useState(initialShares);
  const [pendingLike, setPendingLike] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [pendingShare, setPendingShare] = useState(false);
  const [pendingComment, setPendingComment] = useState(false);

  // Auto play/pause when in viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
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
    if (pendingLike) return;
    setPendingLike(true);
    // optimistic
    const prevLiked = liked;
    const prevLikes = likes;
    const nextLiked = !prevLiked;
    const nextLikes = prevLikes + (nextLiked ? 1 : -1);
    setLiked(nextLiked);
    setLikes(Math.max(0, nextLikes));
    if (nextLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 600);
    }
    try {
      const res = await likeVideoAPI(video._id);
      // reconcile with backend (if shape differs)
      const serverLikes = typeof res.likes === 'number' ? res.likes : (Array.isArray(res.likedBy) ? res.likedBy.length : nextLikes);
      const serverLiked = Array.isArray(res.likedBy) ? res.likedBy.includes(userId) : (typeof res.liked === 'boolean' ? res.liked : nextLiked);
      setLikes(serverLikes);
      setLiked(serverLiked);
    } catch (err) {
      // rollback
      console.error('like failed', err);
      setLiked(prevLiked);
      setLikes(prevLikes);
      if (err?.response?.status === 401) {
        alert('Please log in to like reels.');
      }
    } finally {
      setPendingLike(false);
    }
  };

  const handleSave = async () => {
    if (pendingSave) return;
    setPendingSave(true);
    const prevSaved = saved;
    const nextSaved = !prevSaved;
    // optimistic
    setSaved(nextSaved);
    try {
      const res = await saveVideoAPI(video._id);
      const serverSaved = Array.isArray(res.savedBy) ? res.savedBy.includes(userId) : (typeof res.saved === 'boolean' ? res.saved : nextSaved);
      setSaved(serverSaved);
      if (serverSaved !== prevSaved && typeof onSavedToggle === 'function') {
        onSavedToggle({ videoId: video._id, saved: serverSaved });
      }
    } catch (err) {
      console.error('save failed', err);
      // rollback
      setSaved(prevSaved);
      if (err?.response?.status === 401) {
        alert('Please log in to save reels.');
      }
    } finally {
      setPendingSave(false);
    }
  };

  const handleShare = async () => {
    if (pendingShare) return;
    setPendingShare(true);
    // optimistic
    const prevShares = shares;
    setShares(prev => prev + 1);

    // Build a hash-router friendly share URL to this reel
    let shareUrl = `${window.location.origin}${window.location.pathname}#/reels?video=${video._id}`;
    try {
      await shareVideoAPI(video._id);
      if (navigator.share) {
        await navigator.share({ title: video.title || 'Reel', url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        // Optional: non-blocking toast could be added; using alert for now
        alert("📋 Link copied!");
      }
    } catch (err) {
      console.error('share failed', err);
      // rollback
      setShares(prevShares);
    } finally {
      setPendingShare(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || pendingComment) return;
    setPendingComment(true);
    const temp = { _id: `temp-${Date.now()}`, userId: { fullName: 'You' }, text: commentText.trim(), temp: true };
    const prev = comments;
    // optimistic add
    setComments([...comments, temp]);
    setCommentText("");
    try {
      const res = await commentVideoAPI(video._id, temp.text);
      const serverComments = Array.isArray(res.comments) ? res.comments : prev;
      setComments(serverComments);
    } catch (err) {
      console.error('comment failed', err);
      // rollback remove temp
      setComments(prev);
      if (err?.response?.status === 401) {
        alert('Please log in to comment.');
      }
    } finally {
      setPendingComment(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative h-[95%] w-full flex items-center justify-center bg-black">
      {/* Video container */}
      <div className="relative w-full max-w-[480px] h-full flex items-center justify-center overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="max-h-full max-w-full object-contain"
          loop
          playsInline
          onClick={togglePlay}
          muted={isMuted}
        />

        {/* Gradient edges for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Animated heart */}
        {showHeart && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-red-500 text-6xl pointer-events-none"
          >
            <Heart />
          </motion.div>
        )}
      </div>

      {/* Right actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 text-white z-20">
        <motion.button whileTap={{ scale: 1.2 }} onClick={handleLike} disabled={pendingLike} className="flex flex-col items-center disabled:opacity-60">
          <Heart className={`h-8 w-8 ${liked ? "text-red-500" : "text-white"}`} />
          <span className="text-sm">{formatCount(likes)}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} onClick={() => setShowComments(true)} className="flex flex-col items-center">
          <MessageCircle className="h-8 w-8" />
          <span className="text-sm">{formatCount(comments.length)}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} onClick={handleSave} disabled={pendingSave} className="flex flex-col items-center disabled:opacity-60">
          <Bookmark className={`h-8 w-8 ${saved ? "text-yellow-400" : "text-white"}`} />
          <span className="text-xs">{saved ? 'Saved' : 'Save'}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 1.2 }} onClick={handleShare} disabled={pendingShare} className="flex flex-col items-center disabled:opacity-60">
          <Share2 className="h-8 w-8" />
          <span className="text-sm">{formatCount(shares)}</span>
        </motion.button>

        <button onClick={toggleMute} className="text-white mt-2 opacity-80 hover:opacity-100 transition">{isMuted ? "🔇" : "🔊"}</button>
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-6 text-white max-w-[70%] z-20 drop-shadow">
        <h3 className="font-bold text-lg leading-tight">{video.facultyId?.fullName || video.author?.name || "Unknown"}</h3>
        <p className="text-sm opacity-90">{video.title}</p>
        {video.description && <p className="text-xs mt-1 text-gray-300 line-clamp-3">{video.description}</p>}
      </div>

      {/* Comments modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-end z-30">
          <div className="bg-white rounded-t-2xl p-4 h-1/2 overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">Comments</h2>
            {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
            <div className="space-y-2">
              {comments.map((c, i) => (
                <div key={c._id || i} className="border-b pb-1">
                  <span className="font-semibold">{c.userId?.fullName || c.user?.name || "User"}:</span> {c.text}
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
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <button onClick={handleAddComment} disabled={pendingComment} className="bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded-full">
              Post
            </button>
            <button onClick={() => setShowComments(false)} className="text-red-500 ml-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
