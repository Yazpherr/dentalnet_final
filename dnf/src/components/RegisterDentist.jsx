import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

// Establecer el elemento raíz para react-modal
Modal.setAppElement('#root');

const RegisterDentist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    dni: '',
    dedication: '',
  });

  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/register-dentist', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
      closeModal(); // Cerrar el modal después del registro exitoso
    } catch (error) {
      setMessage('Failed to register dentist');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
        >
          <FiPlus className="mr-2" />
          Agregar Dentista
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registrar Dentista"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl mb-4">Registrar Dentista</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
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
            <label className="block text-sm font-bold mb-2">Dedicación</label>
            <input
              type="text"
              name="dedication"
              value={formData.dedication}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Registrar Dentista
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
        <button onClick={closeModal} className="mt-4 text-gray-500 hover:text-gray-800">
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default RegisterDentist;
