import { useState, useEffect } from 'react';
import { Form, Button, Spin, message, Alert, Card, Input, Progress, Row, Col } from 'antd';
import { getPatientProfile, updatePatientProfile } from '../../../services/api';
import UpdateProfile from '../../UI/modals/UpdateProfile';
import PatientInfoCard from '../../UI/cards/PatientInfoCard';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Falta el token');
      }

      const response = await getPatientProfile(token);
      setProfile(response.data.patient);
      setError('');
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      setError(error.response?.data?.error || 'Error al obtener el perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Falta el token');
      }

      const response = await updatePatientProfile(token, values);
      setFormMessage(response.data.message);
      setError('');
      message.success({
        content: 'Perfil actualizado exitosamente',
        duration: 2, // La duración en segundos para que el mensaje desaparezca
      });
      setIsModalVisible(false); // Cerrar el modal si la actualización es exitosa
      fetchProfile(); // Volver a obtener el perfil para actualizar la tarjeta
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError(error.response?.data?.error || 'Error al actualizar el perfil');
      message.error({
        content: 'Error al actualizar el perfil',
        duration: 2, // La duración en segundos para que el mensaje desaparezca
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setFormMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6 relative">
      
      <Spin spinning={loading} size="large">
        
        <Row gutter={16} className="w-full max-w-4xl mt-6">
          <Col span={12}>
            <PatientInfoCard profile={profile} />
          </Col>
          <Col span={12} className="flex flex-col items-end">
            <Button
              type="primary"
              onClick={showModal}
              style={{ backgroundColor: 'primaryBlue' }}
              className="mb-4"
            >
              Actualizar Perfil
            </Button>
            <Card title="Nivel de Salud Oral" className="w-full text-center">
              <Progress type="circle" percent={profile.oral_health_level} />
            </Card>
          </Col>
        </Row>
        <UpdateProfile
          visible={isModalVisible}
          onClose={handleClose}
          onSubmit={handleSubmit}
          profile={profile}
          form={form}
        />
        {formMessage && <Alert message={formMessage} type="success" showIcon />}
        {error && <Alert message={error} type="error" showIcon />}
      </Spin>
    </div>
  );
};

export default PatientDashboard;
