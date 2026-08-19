import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10, sort } = req.query;

    let query = { userId: req.user._id };

    // Filtering
    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sorting
    let sortOption = {};
    if (sort === "dueDate") sortOption.dueDate = 1;
    else if (sort === "createdAt") sortOption.createdAt = -1;

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "done"] }, 1, 0],
            },
          },
          pendingTasks: {
            $sum: {
              $cond: [{ $ne: ["$status", "done"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const result = stats[0] || {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
    };

    const completionRate =
      result.totalTasks > 0
        ? (result.completedTasks / result.totalTasks) * 100
        : 0;

    res.json({
      totalTasks: result.totalTasks,
      completedTasks: result.completedTasks,
      pendingTasks: result.pendingTasks,
      completionRate: Math.round(completionRate),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
