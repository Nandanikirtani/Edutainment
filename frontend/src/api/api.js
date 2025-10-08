import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}`,
  withCredentials: true,
});

// Attach Authorization header from localStorage if present
API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('user');
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.token || parsed?.data?.token || parsed?.accessToken || parsed?.jwt;
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {}
  return config;
});

// ✅ Fetch all approved videos
export const getAcceptedVideosAPI = async (page = 1, limit = 10) => {
  const res = await API.get(`/videos/approved?page=${page}&limit=${limit}`);
  return res.data.data || [];
};

// ✅ Like toggle
export const likeVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/like`);
  return res.data?.data || res.data;
};

// ✅ Save toggle
export const saveVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/save`);
  return res.data?.data || res.data;
};

// ✅ Share increment
export const shareVideoAPI = async (id) => {
  const res = await API.post(`/videos/${id}/share`);
  return res.data?.data || res.data;
};

// ✅ Add comment
export const commentVideoAPI = async (id, text) => {
  const res = await API.post(`/videos/${id}/comments`, { text });
  return res.data?.data || res.data;
};

// ✅ Fetch saved videos for current user
export const getSavedVideosAPI = async (page = 1, limit = 20) => {
  const res = await API.get(`/videos/saved?page=${page}&limit=${limit}`);
  return res.data.data || [];
};
