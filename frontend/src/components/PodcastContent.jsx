// PodcastContent.jsx
import React from "react";

export default function PodcastContent({ title, speaker, desc, bgImage }) {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Text content */}
      <div className="relative z-10 max-w-2xl p-10">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="mb-4 text-lg">🎙️ {speaker}</p>
        <p className="mb-6 text-gray-200 leading-relaxed">{desc}</p>

        {/* Main buttons */}
        <div className="flex gap-4 mb-4">
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold">
            ▶ Start Watching
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg font-semibold">
            + Content Library
          </button>
          <span className="bg-gray-900 px-5 py-2 rounded-lg">2025 •</span>
        </div>

        {/* Share & Like buttons */}
        <div className="flex gap-4 mt-2">
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold">
            🔗 Share
          </button>
          <button className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-lg font-semibold">
            ❤️ Like
          </button>
        </div>
      </div>
    </div>
  );
}
