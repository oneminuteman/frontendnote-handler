import { useState, useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import { getNotes, addNote } from "./api"; // Import API functions

const NotesList = ({ handleDeleteNote }) => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes(); // Fetch notes from API
        setNotes(response);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // Add note to the backend and update the local state
  const handleAddNote = async (noteText) => {
    try {
      const newNote = await addNote(noteText); // Add note via API
      setNotes([...notes, newNote]); // Update local state with the new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
