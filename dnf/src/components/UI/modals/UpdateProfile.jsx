// src/components/UI/modals/UpdateProfile.jsx

import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const UpdateProfile = ({ visible, onClose, onSubmit, profile, form }) => {
  return (
    <Modal
      title="Actualizar Perfil"
      visible={visible}
      onOk={form.submit}
      onCancel={onClose}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={profile}
        className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md"
      >
        <Form.Item
          name="dni"
          label="DNI"
          rules={[{ required: true, message: 'Por favor, ingresa tu DNI' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Edad"
          rules={[{ required: true, message: 'Por favor, ingresa tu edad' }]}
        >
          <Input type="number" className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Género"
          rules={[{ required: true, message: 'Por favor, ingresa tu género' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Número de Teléfono"
          rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="medical_conditions"
          label="Condiciones Médicas"
          rules={[{ required: true, message: 'Por favor, ingresa tus condiciones médicas' }]}
        >
          <Input.TextArea className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="oral_health_level"
          label="Nivel de Salud Oral"
          rules={[{ required: true, message: 'Por favor, ingresa tu nivel de salud oral' }]}
        >
          <Input type="number" className="rounded-md custom-input" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateProfile.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default UpdateProfile;
