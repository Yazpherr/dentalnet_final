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
// export const getPatients = (token) => {
//   return axios.get(`${API_URL}/patients`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// };

// Función para obtener todas los pacientes
export const getPatients = (token) => {
  return axios.get(`${API_URL}/doctor/patients`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para crear una receta
export const createPrescription = (token, formData) => {
  return axios.post(`${API_URL}/create-prescription`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Función para obtener todas los pacientes para administradores
export const getPatientsForAdmin = (token) => {
  return axios.get(`${API_URL}/admin/patients`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para obtener la lista de recetas
export const getPrescriptions = (token) => {
  return axios.get(`${API_URL}/doctor/prescriptions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Función para obtener el perfil del paciente
export const getPatientProfile = (token) => {
  return axios.get(`${API_URL}/patient/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Función para actualizar el perfil del paciente
export const updatePatientProfile = (token, profile) => {
  return axios.post(`${API_URL}/update-profile`, profile, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para obtener la lista de recetas del paciente
export const getPatientPrescriptions = (token) => {
  return axios.get(`${API_URL}/patient/prescriptions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// MODULO DE CITAS MEDICAS__________________________________________
export const getPatientAppointments = (token) => {
  return axios.get(`${API_URL}/patient/appointments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAvailableSchedules = (token) => {
  return axios.get(`${API_URL}/available-schedules`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const bookAppointment = (token, appointmentData) => {
  return axios.post(`${API_URL}/book-appointment`, appointmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Nueva función para actualizar un paciente como doctor
export const updatePatientAsDoctor = (token, id, patientData) => {
  return axios.post(`${API_URL}/doctor/update-patient/${id}`, patientData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
