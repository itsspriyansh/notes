import React from 'react';
import NoteItem from './NoteItem';
import './NoteList.css';

const NoteList = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="note-list-container">
        <h2>Your Notes</h2>
        <div className="empty-state">
          <p>No notes yet. Create your first note above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-list-container">
      <h2>Your Notes ({notes.length})</h2>
      <div className="note-list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
