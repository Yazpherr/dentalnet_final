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

// Nueva función para obtener la lista de dentistas
export const getDentists = (token) => {
  return axios.get(`${API_URL}/dentists`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para registrar un nuevo dentista
export const registerDentist = (token, formData) => {
  return axios.post(`${API_URL}/register-dentist`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para obtener la lista de pacientes
export const getPatients = (token) => {
  return axios.get(`${API_URL}/patients`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


// Nueva función para crear una receta
export const createPrescription = (token, formData) => {
  return axios.post(`${API_URL}/create-prescription`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para obtener la lista de recetas
export const getPrescriptions = (token) => {
  return axios.get(`${API_URL}/doctor/prescriptions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};