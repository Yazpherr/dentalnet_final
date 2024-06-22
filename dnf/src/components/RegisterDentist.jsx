import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiPlus } from "react-icons/fi";
import { getDentists, registerDentist } from "../services/api";

// Establecer el elemento raíz para react-modal
Modal.setAppElement("#root");

const RegisterDentist = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    dni: "",
    dedication: "",
  });

  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dentists, setDentists] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);

    const fetchDentists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getDentists(token);
        setDentists(response.data.dentists);
        setIsLoadingData(false);
      } catch (error) {
        setIsLoadingData(false);
        console.error("Failed to fetch dentists:", error);
      }
    };

    fetchDentists();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await registerDentist(token, formData);
      setMessage(response.data.message);
      closeModal(); // Cerrar el modal después del registro exitoso
      // Refrescar la lista de dentistas
      const newResponse = await getDentists(token);
      setDentists(newResponse.data.dentists);
    } catch (error) {
      setMessage("Failed to register dentist");
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

      {isLoadingData ? "cargando..." : "ya cargue"}

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Correo Electrónico</th>
            <th className="py-2 px-4 border-b">DNI</th>
            <th className="py-2 px-4 border-b">Dedicación</th>
          </tr>
        </thead>
        <tbody>
          {dentists.map((dentist) => (
            <tr key={dentist.id}>
              <td className="py-2 px-4 border-b">{dentist.name}</td>
              <td className="py-2 px-4 border-b">{dentist.email}</td>
              <td className="py-2 px-4 border-b">{dentist.dni}</td>
              <td className="py-2 px-4 border-b">{dentist.dedication}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registrar Dentista"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl mb-4">Registrar Dentista</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
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
            <label className="block text-sm font-bold mb-2">
              Correo Electrónico
            </label>
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
            <label className="block text-sm font-bold mb-2">
              Confirmar Contraseña
            </label>
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Registrar Dentista
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
        <button
          onClick={closeModal}
          className="mt-4 text-gray-500 hover:text-gray-800"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default RegisterDentist;
