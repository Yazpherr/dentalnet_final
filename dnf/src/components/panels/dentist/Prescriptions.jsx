// src/components/panels/dentist/Prescriptions.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, DatePicker, message, Table } from 'antd';
import { createPrescription, getPrescriptions } from '../../../services/api';

const Prescriptions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [prescriptions, setPrescriptions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await getPrescriptions(token);
      setPrescriptions(response.data.prescriptions);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
    }
  };

  const handleCreate = async (values) => {
    try {
      await createPrescription(token, {
        ...values,
        prescription_date: values.prescription_date.format('YYYY-MM-DD'),
        expiration_date: values.expiration_date.format('YYYY-MM-DD'),
      });
      message.success('Receta creada exitosamente');
      form.resetFields();
      setIsModalVisible(false);
      fetchPrescriptions(); // Refrescar la lista
    } catch (error) {
      message.error('Error al crear la receta');
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
        <h2>Recetas</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Agregar Receta</Button>
      </div>
      <Table dataSource={prescriptions} columns={columns} rowKey="id_prescription" />
      <Modal
        title="Crear Receta"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item name="dni" label="DNI" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="id_prescription" label="ID de Receta" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prescription_date" label="Fecha de Receta" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item name="name_drug" label="Nombre del Medicamento" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="instructions_use" label="Instrucciones" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="expiration_date" label="Fecha de Expiración" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Crear Receta</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Prescriptions;
