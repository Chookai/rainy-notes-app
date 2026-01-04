import { useState, useEffect, useCallback } from 'react';
import RainAnimation from './components/aesthetic/RainAnimation';
import AudioPlayer from './components/aesthetic/AudioPlayer';
import ForestBackground from './components/aesthetic/ForestBackground';
import SearchBar from './components/SearchBar';
import TagManager from './components/TagManager';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { notesApi } from './api/notesApi';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagId, setActiveTagId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadNotes();
    loadTags();
  }, []);

  // Filter notes based on search and active tag
  useEffect(() => {
    let filtered = notes;

    if (activeTagId !== null) {
      filtered = notes.filter((note) =>
        note.tags.some((tag) => tag.id === activeTagId)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  }, [notes, searchQuery, activeTagId]);

  const loadNotes = async () => {
    try {
      const data = await notesApi.fetchNotes();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load notes:', error);
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const data = await notesApi.fetchTags();
      setTags(data);
    } catch (error) {
      console.error('Failed to load tags:', error);
    }
  };

  const handleNewNote = () => {
    const newNote = {
      id: null,
      title: '',
      content: '',
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSelectedNote(newNote);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (noteData.id) {
        // Update existing note
        const updated = await notesApi.updateNote(noteData.id, {
          title: noteData.title,
          content: noteData.content,
        });

        // Update tags
        const existingTagIds = selectedNote.tags.map((t) => t.id);
        const newTagIds = noteData.tags.map((t) => t.id);

        // Add new tags
        for (const tagId of newTagIds) {
          if (!existingTagIds.includes(tagId)) {
            await notesApi.addTagToNote(noteData.id, tagId);
          }
        }

        // Remove old tags
        for (const tagId of existingTagIds) {
          if (!newTagIds.includes(tagId)) {
            await notesApi.removeTagFromNote(noteData.id, tagId);
          }
        }

        setNotes(notes.map((n) => (n.id === noteData.id ? { ...updated, tags: noteData.tags } : n)));
        setSelectedNote({ ...updated, tags: noteData.tags });
      } else {
        // Create new note
        const created = await notesApi.createNote({
          title: noteData.title,
          content: noteData.content,
        });

        // Add tags to new note
        for (const tag of noteData.tags) {
          await notesApi.addTagToNote(created.id, tag.id);
        }

        const noteWithTags = { ...created, tags: noteData.tags };
        setNotes([noteWithTags, ...notes]);
        setSelectedNote(noteWithTags);
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesApi.deleteNote(noteId);
      setNotes(notes.filter((n) => n.id !== noteId));
      setSelectedNote(null);
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleCreateTag = async (tagData) => {
    try {
      const created = await notesApi.createTag(tagData);
      setTags([...tags, created]);
    } catch (error) {
      console.error('Failed to create tag:', error);
      if (error.response?.status === 400) {
        alert('A tag with this name already exists.');
      } else {
        alert('Failed to create tag. Please try again.');
      }
    }
  };

  const handleSelectTag = (tagId) => {
    setActiveTagId(tagId);
  };

  return (
    <div className="app">
      <ForestBackground />
      <RainAnimation />
      <AudioPlayer />

      <div className="app-container">
        <aside className="sidebar-left">
          <div className="sidebar-content">
            <h1 className="app-title">Rainy Forest Notes</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <TagManager
              tags={tags}
              activeTagId={activeTagId}
              onSelectTag={handleSelectTag}
              onCreateTag={handleCreateTag}
            />
          </div>
        </aside>

        <main className="main-content">
          {loading ? (
            <div className="loading-state">Loading notes...</div>
          ) : (
            <NotesList
              notes={filteredNotes}
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              onNewNote={handleNewNote}
            />
          )}
        </main>

        <aside className="sidebar-right">
          <NoteEditor
            note={selectedNote}
            tags={tags}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
