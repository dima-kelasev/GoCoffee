import axios from 'axios';

const API_BASE_URL = 'http://45.138.24.118';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
