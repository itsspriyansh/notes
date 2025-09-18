const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const notesStorage = {};

app.get('/api/notes/:userId', (req, res) => {
  const { userId } = req.params;
  const userNotes = notesStorage[userId] || [];
  res.json(userNotes);
});

app.post('/api/notes/:userId', (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  if (!notesStorage[userId]) {
    notesStorage[userId] = [];
  }

  notesStorage[userId].push(newNote);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:userId/:noteId', (req, res) => {
  const { userId, noteId } = req.params;
  
  if (!notesStorage[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  const noteIndex = notesStorage[userId].findIndex(note => note.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notesStorage[userId].splice(noteIndex, 1);
  res.json({ message: 'Note deleted successfully' });
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
