import React, { useState } from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      await onDelete(note.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <button 
          className="delete-btn"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete note"
        >
          {isDeleting ? '...' : '×'}
        </button>
      </div>
      
      <div className="note-content">
        {note.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      
      <div className="note-footer">
        <span className="note-date">
          Created: {formatDate(note.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;
