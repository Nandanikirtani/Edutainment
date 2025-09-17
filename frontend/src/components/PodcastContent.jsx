// PodcastContent.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";

export default function PodcastContent({ title, speaker, desc, bgImage, videoId, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handleClose = () => setIsPlaying(false);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {isPlaying ? (
        // ✅ Fullscreen Video
        <>
          <iframe
            className="fixed inset-0 w-full h-full z-50"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          {/* Back button */}
          <button
            onClick={handleClose}
            className="fixed top-4 left-4 z-50 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </>
      ) : (
        // ✅ Content Screen
        <div className="relative z-10 max-w-3xl p-10 text-center">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="mb-4 text-lg">🎙️ {speaker}</p>
          <p className="mb-6 text-gray-200 leading-relaxed">{desc}</p>

          {/* Main buttons */}
          <div className="flex gap-4 mb-4 justify-center flex-wrap">
            <button
              onClick={handlePlay}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full flex items-center gap-2 font-semibold transition"
            >
              <Play className="w-5 h-5" /> Start Watching
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-full font-semibold transition"
              >
                ⬅ Back
              </button>
            )}
            <span className="bg-gray-900 px-5 py-2 rounded-lg">2025 •</span>
          </div>

          {/* Share & Like buttons */}
          <div className="flex gap-4 mt-2 justify-center flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition">
              🔗 Share
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-lg font-semibold transition">
              ❤️ Like
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
