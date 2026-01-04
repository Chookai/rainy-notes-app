import { useState } from 'react';
import './TagManager.css';

const TagManager = ({ tags, activeTagId, onSelectTag, onCreateTag }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6b8e6b');

  const handleCreate = async () => {
    if (newTagName.trim()) {
      await onCreateTag({ name: newTagName.trim(), color: newTagColor });
      setNewTagName('');
      setNewTagColor('#6b8e6b');
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTagName('');
    }
  };

  return (
    <div className="tag-manager">
      <div className="tag-header">
        <h3>Tags</h3>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="add-tag-button"
          title="Add tag"
        >
          {isCreating ? '×' : '+'}
        </button>
      </div>

      {isCreating && (
        <div className="tag-create-form">
          <div className="tag-input-group">
            <input
              type="text"
              placeholder="Tag name..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="tag-input"
              autoFocus
            />
            <input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="tag-color-picker"
              title="Tag color"
            />
          </div>
          <button onClick={handleCreate} className="create-button">
            Create
          </button>
        </div>
      )}

      <div className="tag-list">
        <button
          onClick={() => onSelectTag(null)}
          className={`tag-item ${activeTagId === null ? 'active' : ''}`}
        >
          <span className="tag-bullet" style={{ background: 'var(--mist-medium)' }}>
            ●
          </span>
          All Notes
        </button>

        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onSelectTag(tag.id)}
            className={`tag-item ${activeTagId === tag.id ? 'active' : ''}`}
          >
            <span className="tag-bullet" style={{ background: tag.color }}>
              ●
            </span>
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagManager;
