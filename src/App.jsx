import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Focus from "./pages/Focus";

function App() {
  return (
    <HashRouter>
      <nav className="navbar">
        <div>AI App</div>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/focus">Focus</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
      {/* </BrowserRouter> */}
    </HashRouter>
    // {/* <h1>AI Productivity App</h1> */}
  );
}

export default App;
