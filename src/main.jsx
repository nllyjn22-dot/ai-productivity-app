import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";
import { NotesProvider } from "./context/NotesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <NotesProvider>
      <App />
    </NotesProvider>
  </TaskProvider>,
);
