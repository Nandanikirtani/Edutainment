import React from "react";
import { saveVideoAPI } from "../api/api";

export default function SaveButton({ video }) {
  const handleSave = async () => { await saveVideoAPI(video._id); };
  return <button onClick={handleSave}>💾 Save</button>;
}
