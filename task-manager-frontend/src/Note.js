import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteNote, editNote } from "./api"; // Import API functions

const Note = ({ id, text, date, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      onDelete(id); // Remove note from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async () => {
    if (!newText.trim()) return; // Prevent empty updates
    try {
      await editNote(id, newText);
      onEdit(id, newText); // Update note in UI
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
      ) : (
        <span>{text}</span>
      )}
      <div className="note-footer">
        <small>{date}</small>
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <MdEdit onClick={() => setIsEditing(true)} className="edit-icon" size="1.3em" />
        )}
        <MdDeleteForever onClick={handleDelete} className="delete-icon" size="1.3em" />
      </div>
    </div>
  );
};

export default Note;
