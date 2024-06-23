// src/components/panels/dentist/PrescriptionForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    dni: '',
    id_prescription: '',
    prescription_date: '',
    name_drug: '',
    instructions_use: '',
    expiration_date: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/create-prescription', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to create prescription');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Create Prescription</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">DNI</label>
        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Prescription ID</label>
        <input
          type="text"
          name="id_prescription"
          value={formData.id_prescription}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Prescription Date</label>
        <input
          type="date"
          name="prescription_date"
          value={formData.prescription_date}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Drug Name</label>
        <input
          type="text"
          name="name_drug"
          value={formData.name_drug}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Instructions</label>
        <textarea
          name="instructions_use"
          value={formData.instructions_use}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Expiration Date</label>
        <input
          type="date"
          name="expiration_date"
          value={formData.expiration_date}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Prescription</button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default PrescriptionForm;
