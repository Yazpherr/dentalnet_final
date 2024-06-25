import { Modal, Form, Input, DatePicker, Button, message, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const CreatePrescriptionForm = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      await onCreate({
        ...values,
        prescription_date: values.prescription_date.format('YYYY-MM-DD'),
        expiration_date: values.expiration_date.format('YYYY-MM-DD'),
      });
      form.resetFields();
      onClose();
      message.success('Receta creada exitosamente');
    } catch (error) {
      message.error('Error al crear la receta');
    }
  };

  return (
    <Modal
      title="Crear Receta"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="dni" label={<span className="form-label">DNI</span>} rules={[{ required: true, message: 'Por favor ingrese el DNI' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="id_prescription" label={<span className="form-label">ID de Receta</span>} rules={[{ required: true, message: 'Por favor ingrese el ID de la receta' }]}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="prescription_date" label={<span className="form-label">Fecha de Receta</span>} rules={[{ required: true, message: 'Por favor seleccione la fecha de la receta' }]}>
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="expiration_date" label={<span className="form-label">Fecha de Expiración</span>} rules={[{ required: true, message: 'Por favor seleccione la fecha de expiración' }]}>
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="name_drug" label={<span className="form-label">Nombre del Medicamento</span>} rules={[{ required: true, message: 'Por favor ingrese el nombre del medicamento' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="instructions_use" label={<span className="form-label">Instrucciones</span>} rules={[{ required: true, message: 'Por favor ingrese las instrucciones' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>Cancelar</Button>
            <Button type="primary" htmlType="submit">Crear Receta</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreatePrescriptionForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreatePrescriptionForm;
