import { useTasks } from "../context/TaskContext";
import { useNotes } from "../context/NotesContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function Dashboard() {
  const { tasks } = useTasks();
  const { notes } = useNotes();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const totalNotes = notes.length;
  const productivity =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const data = [
    {
      name: "Tasks",
      value: totalTasks,
    },
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
    { name: "Notes", value: totalNotes },
  ];
  return (
    <div className="container">
      <h2 className="title">Dashboard </h2>
      <div className="dashboard-grid">
        <div className="card">Total Tasks: {totalTasks}</div>
        <div className="card">Completed: {completedTasks}</div>
        <div className="card">Pending: {pendingTasks}</div>
        <div className="card">Notes: {totalNotes}</div>
        <div className="card">Productivity: {productivity}%</div>
      </div>
      <div className="card" style={{ marginTop: "30px" }}>
        <h3>Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff4da6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Dashboard;
