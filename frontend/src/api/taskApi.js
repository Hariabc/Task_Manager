import axios from "../utils/axiosInstance";

export const getTasks = (params = {}) => axios.get("/tasks", { params });
export const getTaskById = (id) => axios.get(`/tasks/${id}`);
export const createTask = (task) => axios.post("/tasks", task);
export const updateTask = (id, updates) => axios.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);
export const getTaskAnalytics = () => axios.get("/tasks/analytics");
