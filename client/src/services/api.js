import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Settings
export const getPublicSettings = () => api.get('/settings/public');

// Profile
export const getPublicProfile = () => api.get('/profile/public');

// Projects
export const getProjects = () => api.get('/projects?public=true');
export const getProjectBySlug = (slug) => api.get(`/projects/slug/${slug}`);

// Skills
export const getSkills = () => api.get('/skills?public=true');

// Experience
export const getExperiences = () => api.get('/experience?public=true');

// Achievements
export const getAchievements = () => api.get('/achievements?public=true');

// AI Assistant
export const askAssistant = (data) => api.post('/assistant/ask', data);

export default api;
