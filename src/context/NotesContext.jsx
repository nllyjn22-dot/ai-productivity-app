import { createContext, useContext, useState, useEffect } from "react";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(text) {
    const newNote = {
      id: Date.now(),
      text,
    };
    setNotes([newNote, ...notes]);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function updateNote(id, newText) {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note)),
    );
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
