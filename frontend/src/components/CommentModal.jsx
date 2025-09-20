import React, { useState } from "react";

export default function CommentModal({ videoId, comments, onClose, onAddComment }) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text) return;
    await onAddComment(videoId, text);
    setText("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-end">
      <div className="bg-white w-full p-4 rounded-t-2xl max-h-1/2 overflow-y-scroll">
        <button onClick={onClose}>❌ Close</button>
        <div className="space-y-2">
          {comments.map((c, idx) => (
            <p key={idx}>{c.userId}: {c.text}</p>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border p-2"
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}




