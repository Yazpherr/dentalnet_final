// src/components/UI/cards/PatientInfoCard.jsx
import { Card, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const PatientInfoCard = ({ profile }) => {
  return (
    <Card title="Información del Paciente">
      <Form layout="vertical">
        <Form.Item label="DNI">
          <Input value={profile.dni} disabled />
        </Form.Item>
        <Form.Item label="Edad">
          <Input value={profile.age} disabled />
        </Form.Item>
        <Form.Item label="Género">
          <Input value={profile.gender} disabled />
        </Form.Item>
        <Form.Item label="Número de Teléfono">
          <Input value={profile.phone_number} disabled />
        </Form.Item>
        <Form.Item label="Condiciones Médicas">
          <Input.TextArea value={profile.medical_conditions} disabled />
        </Form.Item>
        <Form.Item label="Nivel de Salud Oral">
          <Input value={profile.oral_health_level} disabled />
        </Form.Item>
      </Form>
    </Card>
  );
};

PatientInfoCard.propTypes = {
  profile: PropTypes.shape({
    dni: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    medical_conditions: PropTypes.string.isRequired,
    oral_health_level: PropTypes.number.isRequired,
  }).isRequired,
};

export default PatientInfoCard;
