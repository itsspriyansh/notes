# Notes App

A single-page React.js application for creating and managing personal notes with in-memory storage.

## Features

- Create notes with title and content
- View all notes for a specific user
- Delete notes
- Responsive design
- Modern, clean UI
- User identification via localStorage
- In-memory storage (no database required)

## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js
- **Storage**: In-memory (JavaScript objects)
- **Styling**: CSS with modern gradients and glass-morphism effects

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone or download the project
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

### Running the Application

#### Development Mode (Recommended)

Run both backend and frontend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Production Mode

1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/notes/:userId` - Get all notes for a user
- `POST /api/notes/:userId` - Create a new note
- `DELETE /api/notes/:userId/:noteId` - Delete a specific note

## Usage

1. Open the application in your browser
2. A unique user ID will be automatically generated and stored in localStorage
3. Create notes using the form at the top
4. View all your notes below the form
5. Delete notes using the × button on each note
6. Your notes persist in memory until the server is restarted

## Project Structure

```
oneHour/
├── server.js              # Express.js backend
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Main styles
│   │   └── components/    # React components
│   │       ├── NoteForm.js
│   │       ├── NoteList.js
│   │       ├── NoteItem.js
│   │       └── *.css      # Component styles
│   └── package.json       # Frontend dependencies
└── README.md
```

## Notes

- Data is stored in memory and will be lost when the server restarts
- Each user is identified by a unique ID stored in localStorage
- The app is fully responsive and works on desktop and mobile devices
- No database setup required - perfect for quick prototyping and testing
