import { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, message } from 'antd';
import { getDentists, getPatients } from '../../../services/api';

const AdminPanel = () => {
  const [dentistCount, setDentistCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch dentists count
        const dentistResponse = await getDentists(token);
        setDentistCount(dentistResponse.data.dentists.length);

        // Fetch patients count
        const patientResponse = await getPatients(token);
        setPatientCount(patientResponse.data.patients.length);
        
      } catch (error) {
        message.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Spin spinning={loading} size="large">
        <Row gutter={[16, 16]} className="w-full">
          <Col xs={24} md={8}>
            <Card className="shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-4">Total de Doctores</h3>
              <p className="text-3xl">{dentistCount}</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-4">Total de Pacientes</h3>
              <p className="text-3xl">{patientCount}</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-4">Tarjeta 3</h3>
              <p className="text-3xl">Contenido</p>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default AdminPanel;
