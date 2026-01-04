import { formatDistanceToNow } from 'date-fns';
import './NotesList.css';

const NotesList = ({ notes, selectedNote, onSelectNote, onNewNote }) => {
  const getPreview = (content) => {
    const stripped = content.replace(/[#*`_~\[\]]/g, '').trim();
    return stripped.substring(0, 100) + (stripped.length > 100 ? '...' : '');
  };

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h2>Notes</h2>
        <button onClick={onNewNote} className="new-note-button" title="New note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="notes-scroll">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet</p>
            <p className="empty-hint">Create your first note to get started</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`note-card ${selectedNote?.id === note.id ? 'active' : ''}`}
              onClick={() => onSelectNote(note)}
            >
              <h3 className="note-title">{note.title || 'Untitled'}</h3>
              <p className="note-preview">{getPreview(note.content)}</p>
              <div className="note-meta">
                <span className="note-date">
                  {formatDistanceToNow(new Date(note.updated_at), {
                    addSuffix: true,
                  })}
                </span>
                {note.tags && note.tags.length > 0 && (
                  <div className="note-tags-preview">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="tag-badge"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
