import axios from "axios";

let backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001/api";

// Auto-correct missing /api suffix
if (backendUrl && !backendUrl.endsWith("/api") && !backendUrl.endsWith("/api/")) {
  backendUrl = backendUrl.replace(/\/$/, "") + "/api";
}

const instance = axios.create({
  baseURL: backendUrl,
});

// Attach token automatically
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default instance;
