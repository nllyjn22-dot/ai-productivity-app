import { useState } from "react";
import { useNotes } from "../context/NotesContext";

function Notes() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAdd() {
    if (!input.trim()) return;

    if (editId) {
      updateNote(editId, input);
      setEditId(null);
    } else {
      addNote(input);
    }

    setInput("");
  }

  function handleEdit(note) {
    setInput(note.text);
    setEditId(note.id);
  }

  return (
    <div className="container">
      <h2 className="title">Notes</h2>

      <div className="card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write note..."
        />
        {notes.length === 0 && <p className="empty">No notes yet 📝</p>}
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      {notes.map((note) => (
        <div key={note.id} className="task-item">
          <span>{note.text}</span>

          <div>
            <button onClick={() => handleEdit(note)}>✏️</button>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
