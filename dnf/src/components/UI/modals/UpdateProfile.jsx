import { Modal, Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const UpdateProfile = ({ visible, onClose, onSubmit, profile, form }) => {
  return (
    <Modal
      title="Actualizar Perfil"
      visible={visible}
      onOk={form.submit}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={profile}
        layout="vertical"
      >
        <Form.Item
          name="dni"
          label={<span className="form-label">DNI</span>}
          rules={[{ required: true, message: 'Por favor, ingresa tu DNI' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="age"
          label={<span className="form-label">Edad</span>}
          rules={[{ required: true, message: 'Por favor, ingresa tu edad' }]}
        >
          <Input type="number" className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="gender"
          label={<span className="form-label">Género</span>}
          rules={[{ required: true, message: 'Por favor, ingresa tu género' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label={<span className="form-label">Número de Teléfono</span>}
          rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono' }]}
        >
          <Input className="rounded-md custom-input" />
        </Form.Item>
        <Form.Item
          name="medical_conditions"
          label={<span className="form-label">Condiciones Médicas</span>}
        >
          <Input.TextArea className="rounded-md custom-input" disabled />
        </Form.Item>
        <Form.Item
          name="oral_health_level"
          label={<span className="form-label">Nivel de Salud Oral</span>}
        >
          <Input type="number" className="rounded-md custom-input" disabled />
        </Form.Item>
        <Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose} className="custom-cancel-button">Cancelar</Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" className="custom-update-button">Actualizar</Button>
            </Col>
          </Row>
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
