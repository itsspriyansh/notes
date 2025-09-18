import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState('');

  // Generate or get user ID on component mount
  useEffect(() => {
    let storedUserId = localStorage.getItem('notesUserId');
    if (!storedUserId) {
      storedUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('notesUserId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);


  // Fetch notes when userId is set
  useEffect(() => {
  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/notes/${userId}`);
      if (response.ok) {
        const notesData = await response.json();
        setNotes(notesData);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

    if (userId) {
      fetchNotes();
    }
  }, [userId]);


  const addNote = async (title, content) => {
    try {
      const response = await fetch(`http://localhost:5001/api/notes/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes(prevNotes => [newNote, ...prevNotes]);
        return true;
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
    return false;
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/notes/${userId}/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Notes</h1>
        <p className="user-id">User ID: {userId}</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <NoteForm onAddNote={addNote} />
          <NoteList notes={notes} onDeleteNote={deleteNote} />
        </div>
      </main>
    </div>
  );
}

export default App;