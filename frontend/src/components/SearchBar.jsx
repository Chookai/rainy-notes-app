import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="search-bar">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search notes..."
        value={localValue}
        onChange={handleChange}
        className="search-input"
      />
      {localValue && (
        <button onClick={handleClear} className="clear-button" title="Clear search">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
