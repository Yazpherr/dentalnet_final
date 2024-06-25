import { useState, useEffect } from 'react';
import { Button, message, Table, Spin } from 'antd';
import { createPrescription, getPrescriptions } from '../../../services/api';
import CreatePrescriptionForm from '../../UI/modals/CreatePrescriptionForm';

const Prescriptions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await getPrescriptions(token);
      setPrescriptions(response.data.prescriptions);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      await createPrescription(token, values);
      fetchPrescriptions();
    } catch (error) {
      console.error("Failed to create prescription:", error);
      throw error;
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className='font-semibold text-2xl text-primaryBlue'>Recetas</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Agregar Receta</Button>
      </div>
      <Spin spinning={loading}>
        <Table dataSource={prescriptions} columns={columns} rowKey="id_prescription" />
      </Spin>
      <CreatePrescriptionForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Prescriptions;
