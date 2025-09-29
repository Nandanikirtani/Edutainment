import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}`,
  withCredentials: true,
});

// ✅ Fetch all approved videos
export const getAcceptedVideosAPI = async (page = 1, limit = 10) => {
  const res = await API.get(`/videos/approved?page=${page}&limit=${limit}`);
  return res.data.data || [];
};

// ✅ Like toggle
export const likeVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/like`);
  return res.data;
};

// ✅ Save toggle
export const saveVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/save`);
  return res.data;
};

// ✅ Share increment
export const shareVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/share`);
  return res.data;
};

// ✅ Add comment
export const commentVideoAPI = async (id, text) => {
  const res = await API.post(`/videos/${id}/comments`, { text });
  return res.data;
};
