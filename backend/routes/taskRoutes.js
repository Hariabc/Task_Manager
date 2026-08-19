import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskAnalytics,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/analytics", protect, getTaskAnalytics);
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
