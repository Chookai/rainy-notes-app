# Rainy Forest Notes

A beautiful, calming note-taking application with a rainy forest aesthetic. Built with React + FastAPI.

## Features

- **CRUD Operations**: Create, read, update, and delete notes
- **Markdown Support**: Write notes using markdown syntax with live preview
- **Tags & Categories**: Organize notes with custom colored tags
- **Search**: Full-text search across note titles and content
- **Rainy Forest Aesthetic**:
  - Animated rain background
  - Ambient rain/forest sounds (toggleable)
  - Forest color palette (deep greens, browns, misty grays)
  - Nature-inspired UI elements

## Tech Stack

**Backend:**
- FastAPI (Python 3.14)
- SQLAlchemy ORM
- SQLite database
- Uvicorn server

**Frontend:**
- React 18
- Vite
- React Markdown + remark-gfm
- Axios for API calls
- date-fns for date formatting

## Prerequisites

- Python 3.14+
- Node.js 24+
- npm

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

   The backend will run on `http://localhost:8000`
   - API docs available at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Optional: Add Rain Sounds

1. Download free rain/forest ambient sounds from:
   - https://freesound.org/
   - https://pixabay.com/sound-effects/search/rain/
   - https://www.zapsplat.com/

2. Place MP3 files in `frontend/public/sounds/`:
   - `rain-gentle.mp3` - Main rain sound
   - `rain-heavy.mp3` (optional)
   - `forest.mp3` (optional)

## Usage

1. **Create a Note**: Click the "+" button in the Notes section
2. **Edit a Note**: Click on any note to select it, then edit in the right panel
3. **Add Tags**: Click "+ Add tag" in the left sidebar to create tags
4. **Search Notes**: Use the search bar to find notes by title or content
5. **Filter by Tag**: Click on a tag to filter notes
6. **Markdown Preview**: Toggle between edit and preview mode with the 👁 button
7. **Toggle Rain Sounds**: Use the audio player in the bottom right corner

## Keyboard Shortcuts

- Press `Save` button or create auto-save (coming soon)

## Project Structure

```
claude/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── database.py       # SQLAlchemy setup
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── crud.py           # Database operations
│   │   └── routers/          # API endpoints
│   └── requirements.txt      # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main app component
    │   ├── api/              # API client
    │   ├── components/       # React components
    │   │   ├── aesthetic/    # Rain, audio, background
    │   │   ├── NotesList.jsx
    │   │   ├── NoteEditor.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── TagManager.jsx
    │   └── styles/           # CSS files
    └── package.json          # Node dependencies
```

## API Endpoints

### Notes
- `GET /api/notes` - List all notes
- `POST /api/notes` - Create a note
- `GET /api/notes/{id}` - Get a specific note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note
- `GET /api/notes/search?q={query}` - Search notes

### Tags
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create a tag
- `POST /api/notes/{note_id}/tags/{tag_id}` - Add tag to note
- `DELETE /api/notes/{note_id}/tags/{tag_id}` - Remove tag from note

## Color Palette

- **Forest Greens**: #1a3a1a, #2d5a2d, #4a7c4a, #6b8e6b
- **Earth Tones**: #4a3628, #5c4a3a
- **Misty Grays**: #e8f0e8, #c5d4c5, #9fb09f
- **Accent Colors**: #7ba3c0 (rain blue), #b8d4e8 (dewdrop)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by the calming atmosphere of rainy forests
- Built with modern web technologies
- Designed for focus and productivity
