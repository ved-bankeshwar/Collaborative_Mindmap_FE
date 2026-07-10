import axios from "axios";

const api = axios.create({
  baseURL: "https://collaborative-mind-map-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("INTERCEPTOR TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("REQUEST HEADERS:", config.headers);

  return config;
});

export default api;