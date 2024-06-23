// src/components/panels/patient/PatientDashboard.jsx

import { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, message, Alert } from 'antd';
import { getPatientProfile, updatePatientProfile } from '../../../services/api';

const PatientDashboard = () => {
  const [profile, setProfile] = useState({
    dni: '',
    age: '',
    gender: '',
    phone_number: '',
    medical_conditions: '',
    oral_health_level: 0,
  });
  const [loading, setLoading] = useState(true);
  const [formMessage, setFormMessage] = useState('');
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is missing');
        }

        const response = await getPatientProfile(token);
        setProfile(response.data.patient);
        setError('');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.error || 'Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await updatePatientProfile(token, values);
      setFormMessage(response.data.message);
      setError('');
      message.success(response.data.message); // Mostrar mensaje de éxito con antd
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.error || 'Failed to update profile');
      message.error('Error al actualizar el perfil'); // Mostrar mensaje de error con antd
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Spin spinning={loading} size="large">
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={profile}
          className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md"
        >
          <h2 className="text-2xl mb-4">Actualizar Perfil</h2>
          <Form.Item
            name="dni"
            label="DNI"
            rules={[{ required: true, message: 'Por favor, ingresa tu DNI' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Edad"
            rules={[{ required: true, message: 'Por favor, ingresa tu edad' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Género"
            rules={[{ required: true, message: 'Por favor, ingresa tu género' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Número de Teléfono"
            rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medical_conditions"
            label="Condiciones Médicas"
            rules={[{ required: true, message: 'Por favor, ingresa tus condiciones médicas' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="oral_health_level"
            label="Nivel de Salud Oral"
            rules={[{ required: true, message: 'Por favor, ingresa tu nivel de salud oral' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Actualizar Perfil</Button>
          </Form.Item>
          {formMessage && <Alert message={formMessage} type="success" showIcon />}
          {error && <Alert message={error} type="error" showIcon />}
        </Form>
      </Spin>
    </div>
  );
};

export default PatientDashboard;
