import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Button } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

const PatientsTable = ({ patients, loading, handleUpdate }) => {
  const [filteredPatients, setFilteredPatients] = useState(patients);

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

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
      title: 'Nivel de Salud Oral %',
      dataIndex: 'oral_health_level',
      key: 'oral_health_level',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdate(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
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

PatientsTable.propTypes = {
  patients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default PatientsTable;
