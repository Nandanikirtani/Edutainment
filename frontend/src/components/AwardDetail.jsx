// AwardDetail.jsx
import React from "react";

export default function AwardDetail({ award }) {
  if (!award) return null; // ✅ safety check

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center max-w-md mx-auto">
      <img
        src={award.img}
        alt={award.title}
        className="w-48 h-48 object-contain mx-auto mb-6"
      />
      <h3 className="text-xl font-bold mb-2">{award.title}</h3>
      <p className="text-gray-300">{award.desc}</p>
    </div>
  );
}
