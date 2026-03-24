import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Tasks() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();

  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // 🔥 SMART SUGGESTION
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

  // 🔥 TASK BREAKDOWN
  function breakTask(text) {
    if (!text.trim()) return [];

    return [text + " - Part 1", text + " - Part 2", text + " - Part 3"];
  }

  function handleAdd() {
    if (!input.trim()) return;
    addTask(input);
    setInput("");
    setSuggestion("");
  }

  function handleBreakTask() {
    const parts = breakTask(input);
    parts.forEach((p) => addTask(p));
    setInput("");
    setSuggestion("");
  }

  return (
    <div className="container">
      <h2 className="title">Tasks</h2>

      {/* INPUT CARD */}
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
        {tasks.length === 0 && (
          <p className="empty">No tasks yet. Add something 🚀</p>
        )}
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleBreakTask}>Break Task</button>

        {/* SUGGESTION */}
        {suggestion && <p className="suggestion">💡 {suggestion}</p>}
      </div>

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span className={task.completed ? "completed" : ""}>{task.text}</span>

          <div className="task-actions">
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "↺" : "✔"}
            </button>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
