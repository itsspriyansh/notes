import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content');
      return;
    }

    setIsSubmitting(true);
    const success = await onAddNote(title.trim(), content.trim());
    
    if (success) {
      setTitle('');
      setContent('');
    } else {
      alert('Failed to add note. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="note-form-container">
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            rows="4"
            disabled={isSubmitting}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
