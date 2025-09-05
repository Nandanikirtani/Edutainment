import axios from "axios";

// ek single axios instance jo sab jagah use hoga
const axiosInstance = axios.create({
  baseURL: "/Edutainment", // backend ka base path
  withCredentials: true,   // cookies / tokens ke liye
});

export default axiosInstance;
