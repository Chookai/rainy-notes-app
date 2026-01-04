import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './NoteEditor.css';

const NoteEditor = ({ note, tags, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setSelectedTags(note.tags || []);
    } else {
      setTitle('');
      setContent('');
      setSelectedTags([]);
    }
  }, [note]);

  const handleSave = useCallback(() => {
    onSave({
      ...note,
      title: title.trim() || 'Untitled',
      content,
      tags: selectedTags,
    });
  }, [note, title, content, selectedTags, onSave]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const availableTags = tags.filter(
    (tag) => !selectedTags.find((t) => t.id === tag.id)
  );

  if (!note) {
    return (
      <div className="note-editor-empty">
        <p>Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <div className="editor-header">
        <input
          type="text"
          className="note-title-input"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-actions">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="preview-toggle"
            title={isPreview ? 'Edit' : 'Preview'}
          >
            {isPreview ? '📝' : '👁'}
          </button>
          {note.id && (
            <button onClick={handleDelete} className="delete-button" title="Delete note">
              🗑
            </button>
          )}
          <button onClick={handleSave} className="save-button" title="Save note">
            Save
          </button>
        </div>
      </div>

      <div className="tags-section">
        <div className="selected-tags">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="tag-chip"
              style={{ backgroundColor: tag.color }}
              onClick={() => toggleTag(tag)}
            >
              {tag.name} ×
            </span>
          ))}
          {availableTags.length > 0 && (
            <button
              className="add-tag-chip"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
            >
              + Add tag
            </button>
          )}
        </div>

        {showTagDropdown && availableTags.length > 0 && (
          <div className="tag-dropdown">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                className="tag-dropdown-item"
                onClick={() => {
                  toggleTag(tag);
                  setShowTagDropdown(false);
                }}
              >
                <span
                  className="tag-color-dot"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="editor-content">
        {isPreview ? (
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="note-content-input"
            placeholder="Write your note in markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
