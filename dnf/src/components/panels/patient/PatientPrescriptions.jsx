// src/components/panels/patient/PatientPrescriptions.jsx

import { useState, useEffect } from 'react';
import { Table, message, Spin } from 'antd';
import { getPatientPrescriptions } from '../../../services/api';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await getPatientPrescriptions(token);
      setPrescriptions(response.data.prescriptions);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
      message.error("Error al cargar las recetas");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID de Receta',
      dataIndex: 'id_prescription',
      key: 'id_prescription',
    },
    {
      title: 'Fecha de Receta',
      dataIndex: 'prescription_date',
      key: 'prescription_date',
    },
    {
      title: 'Nombre del Medicamento',
      dataIndex: 'name_drug',
      key: 'name_drug',
    },
    {
      title: 'Instrucciones',
      dataIndex: 'instructions_use',
      key: 'instructions_use',
    },
    {
      title: 'Fecha de Expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
  ];

  return (
    <div>
      <h2>Lista de Recetas</h2>
      <Spin spinning={loading} size="large">
        <Table dataSource={prescriptions} columns={columns} rowKey="id_prescription" />
      </Spin>
    </div>
  );
};

export default PatientPrescriptions;
