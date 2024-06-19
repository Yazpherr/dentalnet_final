import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getProfile = (token) => {
  return axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const register = (name, email, password, password_confirmation) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation,
  });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

export const logout = (token) => {
  return axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
