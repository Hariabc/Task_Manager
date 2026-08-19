import { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");

  const nextStatus = (status) => {
    if (status === "todo") return "in-progress";
    if (status === "in-progress") return "done";
    return "todo";
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await onUpdateTask(task._id, { title: editTitle.trim(), description: editDesc.trim() });
    setIsEditing(false);
  };

  const handleStatus = async () => {
    await onUpdateTask(task._id, { status: nextStatus(task.status) });
  };

  return (
    <div className={`card task-card ${task.priority}`}>
      {isEditing ? (
        <div className="task-edit-inputs">
          <div>
            <label>Title</label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h4>{task.title}</h4>
            <span className={`status ${task.status}`}>
              {task.status === "in-progress" ? "In Progress" : task.status}
            </span>
          </div>
          <p>{task.description || "No description provided."}</p>
        </>
      )}

      <div className="task-meta">
        <span className={`meta-item priority-${task.priority}`}>
          Priority: {task.priority.toUpperCase()}
        </span>
        {task.dueDate && (
          <span className="meta-item">
            Due: {new Date(task.dueDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
          </span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="edit-save" onClick={handleSave} disabled={!editTitle.trim()}>
              Save
            </button>
            <button onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
              setEditDesc(task.description || "");
            }} className="delete">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="secondary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="secondary" onClick={handleStatus}>Status</button>
            <button onClick={() => onDelete(task._id)} className="delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
