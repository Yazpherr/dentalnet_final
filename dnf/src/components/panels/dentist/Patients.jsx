// src/components/panels/dentist/Patients.jsx

import React, { useState, useEffect } from 'react';
import { Table, Input, Spin } from 'antd';
import { getPatients } from '../../../services/api';

const { Search } = Input;

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true); // Mostrar spinner al iniciar la carga
    try {
      const response = await getPatients(token);
      setPatients(response.data.patients);
      setFilteredPatients(response.data.patients);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false); // Ocultar spinner al finalizar la carga
    }
  };

  const handleSearch = (value) => {
    const filtered = patients.filter(
      patient =>
        patient.user.email.toLowerCase().includes(value.toLowerCase()) ||
        patient.dni.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Correo Electrónico',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Género',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Número de Teléfono',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Condiciones Médicas',
      dataIndex: 'medical_conditions',
      key: 'medical_conditions',
    },
    {
      title: 'Nivel de Salud Oral',
      dataIndex: 'oral_health_level',
      key: 'oral_health_level',
    },
  ];

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <Search
        placeholder="Buscar por correo o DNI"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: 16 }}
      />
      <Spin spinning={loading}>
        <Table dataSource={filteredPatients} columns={columns} rowKey="dni" />
      </Spin>
    </div>
  );
};

export default Patients;
