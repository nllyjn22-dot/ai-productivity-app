import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Tasks() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // ✅ SMART SUGGESTION (LOCAL)
  function getSuggestion(text) {
    const lower = text.toLowerCase();

    if (lower.includes("study")) {
      return "Break into 25 min sessions (Pomodoro)";
    }

    if (lower.includes("project")) {
      return "Divide into UI, logic, and testing parts";
    }

    if (text.length > 40) {
      return "Try splitting into smaller tasks";
    }

    return "";
  }

  // ✅ BREAK TASK
  function breakTask(text) {
    if (!text.trim()) return [];

    return [text + " - Part 1", text + " - Part 2", text + " - Part 3"];
  }

  // ✅ ADD TASK
  function handleAdd() {
    if (!input.trim()) return;

    addTask(input);
    setInput("");
    setSuggestion("");
  }

  // ✅ BREAK TASK BUTTON
  function handleBreakTask() {
    if (!input.trim()) return;

    const parts = breakTask(input);
    parts.forEach((p) => addTask(p));

    setInput("");
    setSuggestion("");
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });
  return (
    <div className="container">
      <h2 className="title">Tasks</h2>

      {/* INPUT BOX */}
      <div className="card">
        <input
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            setSuggestion(getSuggestion(value));
          }}
          placeholder="Enter task..."
        />

        <div className="task-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleBreakTask}>Break Task</button>
        </div>

        {suggestion && <p className="suggestion">💡 {suggestion}</p>}
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 && (
        <p className="empty">No tasks yet. Add something 🚀</p>
      )}

      {/* TASK LIST */}
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-item">
          <span
            onClick={() => toggleTask(task.id)}
            className={task.completed ? "completed" : ""}
            style={{ cursor: "pointer" }}
          >
            {task.text}
          </span>

          <div className="task-actions">
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "↺" : "✔"}
            </button>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ❌
            </button>
            <div className="filters">
              <button onClick={() => setFilter("all")}>All</button>
              <button onClick={() => setFilter("completed")}>Completed</button>
              <button onClick={() => setFilter("pending")}>Pending</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
