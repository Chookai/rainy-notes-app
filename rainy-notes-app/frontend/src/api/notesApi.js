import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  // Notes
  fetchNotes: async (tagId = null) => {
    const params = tagId ? { tag_id: tagId } : {};
    const response = await api.get('/api/notes', { params });
    return response.data;
  },

  fetchNote: async (id) => {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  },

  createNote: async (data) => {
    const response = await api.post('/api/notes', data);
    return response.data;
  },

  updateNote: async (id, data) => {
    const response = await api.put(`/api/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id) => {
    await api.delete(`/api/notes/${id}`);
  },

  searchNotes: async (query) => {
    if (!query) return [];
    const response = await api.get(`/api/notes/search`, { params: { q: query } });
    return response.data;
  },

  // Tags
  fetchTags: async () => {
    const response = await api.get('/api/tags');
    return response.data;
  },

  createTag: async (data) => {
    const response = await api.post('/api/tags', data);
    return response.data;
  },

  addTagToNote: async (noteId, tagId) => {
    const response = await api.post(`/api/notes/${noteId}/tags/${tagId}`);
    return response.data;
  },

  removeTagFromNote: async (noteId, tagId) => {
    const response = await api.delete(`/api/notes/${noteId}/tags/${tagId}`);
    return response.data;
  },

  getNotesByTag: async (tagId) => {
    const response = await api.get(`/api/tags/${tagId}/notes`);
    return response.data;
  },
};

export default notesApi;
