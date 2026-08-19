import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import StatsCard from "../components/StatsCard";
import { getTasks, createTask, updateTask, deleteTask, getTaskAnalytics } from "../api/taskApi";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
    sort: "",
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const tasksResponse = await getTasks(filters);
      setTasks(tasksResponse.data.tasks);
      setTotalPages(tasksResponse.data.pages);

      const analyticsResponse = await getTaskAnalytics();
      setStats(analyticsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    }
  }, [filters]);


 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.token) {
    navigate("/");
    return;
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchData();
}, [fetchData, navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      await createTask({ title, description, priority, dueDate });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setError("");
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const onUpdateTask = async (id, updates) => {
    try {
      await updateTask(id, updates);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="dashboard-title-bar">
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {userName}! Manage and track your tasks.</p>
        </div>

        {error && <div className="auth-error" style={{ marginBottom: "1.5rem" }}>{error}</div>}

        <div className="dashboard-layout">
          {/* Sidebar / Left Column: Creation and Filtering */}
          <div className="sidebar-panel">
            <div className="card">
              <h3>Create Task</h3>
              <form onSubmit={handleCreate} className="form">
                <div>
                  <label htmlFor="task-title">Title</label>
                  <input
                    id="task-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="task-desc">Description</label>
                  <textarea
                    id="task-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <label htmlFor="task-priority">Priority</label>
                  <select
                    id="task-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="task-date">Due Date</label>
                  <input
                    id="task-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <button type="submit">Add Task</button>
              </form>
            </div>

            <div className="card filters-card">
              <h3>Filters</h3>
              <div className="filters-grid">
                <div>
                  <label htmlFor="filter-status">Status</label>
                  <select
                    id="filter-status"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value, page: 1 })
                    }
                  >
                    <option value="">All Status</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="filter-priority">Priority</label>
                  <select
                    id="filter-priority"
                    value={filters.priority}
                    onChange={(e) =>
                      setFilters({ ...filters, priority: e.target.value, page: 1 })
                    }
                  >
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="filter-sort">Sort By</label>
                  <select
                    id="filter-sort"
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters({ ...filters, sort: e.target.value, page: 1 })
                    }
                  >
                    <option value="">Default (None)</option>
                    <option value="dueDate">Due Date (Soonest first)</option>
                    <option value="createdAt">Date Created (Newest first)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main / Right Column: Stats, Search, Task List */}
          <div className="main-content">
            <section className="stats-grid">
              <StatsCard label="Total Tasks" value={stats?.totalTasks ?? 0} />
              <StatsCard label="Completed" value={stats?.completedTasks ?? 0} />
              <StatsCard label="Pending" value={stats?.pendingTasks ?? 0} />
              <StatsCard label="Completion Rate" value={`${stats?.completionRate ?? 0}%`} />
            </section>

            <div className="search-header-panel">
              <div className="search-input-wrapper">
                <input
                  aria-label="Search tasks"
                  placeholder="Search tasks by title or description..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value, page: 1 })
                  }
                />
              </div>
            </div>

            <section className="tasks-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <h4>No tasks found</h4>
                  <p>Try refining your search terms or filters, or add a new task to get started.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdateTask={onUpdateTask} />
                ))
              )}
            </section>

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                >
                  &larr; Prev
                </button>

                <span>
                  Page {filters.page} of {totalPages}
                </span>

                <button
                  disabled={filters.page === totalPages}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
