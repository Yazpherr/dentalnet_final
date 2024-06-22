import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDentists } from "../../../services/api";

const AdminPanel = () => {
  const [dentistCount, setDentistCount] = useState(0);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getDentists(token);
        setDentistCount(response.data.dentists.length);
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };

    fetchDentists();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Total de Doctores</h3>
          <p className="text-3xl">{dentistCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Tarjeta 2</h3>
          <p className="text-3xl">Contenido</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Tarjeta 3</h3>
          <p className="text-3xl">Contenido</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
