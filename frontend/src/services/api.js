import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Guest Session Management
export const getSessionId = async () => {
  let sessionId = localStorage.getItem('guest_session_id');
  if (!sessionId) {
    try {
      const response = await api.post('/session/create');
      sessionId = response.data.session_id;
      localStorage.setItem('guest_session_id', sessionId);
    } catch (error) {
      console.error('Failed to create session', error);
      sessionId = 'temp-guest-session';
    }
  }
  return sessionId;
};

// Image Tools
export const removeBackground = async (file) => {
  const sessionId = localStorage.getItem('guest_session_id');
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/tools/remove-background', formData, {
    headers: { 'session-id': sessionId }
  });
  return response.data;
};

export const compressImage = async (file, quality = 70) => {
  const sessionId = localStorage.getItem('guest_session_id');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('quality', quality);
  const response = await api.post('/tools/compress-image', formData, {
    headers: { 'session-id': sessionId }
  });
  return response.data;
};

export const extractTextOCR = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/tools/ocr', formData);
  return response.data;
};

export const generateCaption = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/tools/caption-generator', formData);
  return response.data;
};

// Download Tools
export const downloadYoutube = async (url) => {
  const formData = new FormData();
  formData.append('url', url);
  const response = await api.post('/download/youtube', formData);
  return response.data;
};

export const downloadInstagram = async (url) => {
  const formData = new FormData();
  formData.append('url', url);
  const response = await api.post('/download/instagram', formData);
  return response.data;
};

export const convertVideoToMp3 = async (file) => {
  const sessionId = localStorage.getItem('guest_session_id');
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/download/video-to-mp3', formData, {
    headers: { 'session-id': sessionId }
  });
  return response.data;
};

export const getHistory = async () => {
  const sessionId = localStorage.getItem('guest_session_id');
  const response = await api.get(`/session/history/${sessionId}`);
  return response.data;
};

export default api;
