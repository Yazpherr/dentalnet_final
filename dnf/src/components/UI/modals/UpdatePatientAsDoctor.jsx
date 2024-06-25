import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { updatePatientAsDoctor } from '../../../services/api';

const UpdatePatientAsDoctor = ({ visible, onClose, patient, token, refreshPatients }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        dni: patient?.dni || '',
        age: patient?.age || '',
        gender: patient?.gender || '',
        phone_number: patient?.phone_number || '',
        medical_conditions: patient?.medical_conditions || '',
        oral_health_level: patient?.oral_health_level || '',
      });
    }
  }, [visible, patient, form]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        await updatePatientAsDoctor(token, patient.id, values);
        message.success('Perfil actualizado exitosamente');
        form.resetFields();
        onClose();
        refreshPatients();
      } catch (error) {
        message.error('Error al actualizar el perfil');
      }
    });
  };

  return (
    <Modal
      title="Actualizar Perfil del Paciente"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Actualizar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          dni: patient?.dni,
          age: patient?.age,
          gender: patient?.gender,
          phone_number: patient?.phone_number,
          medical_conditions: patient?.medical_conditions,
          oral_health_level: patient?.oral_health_level,
        }}
      >
        <Form.Item name="dni" label="DNI" rules={[{ required: true, message: 'Por favor, ingresa el DNI' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="age" label="Edad" rules={[{ required: true, message: 'Por favor, ingresa la edad' }]}>
          <Input type="number" disabled />
        </Form.Item>
        <Form.Item name="gender" label="Género" rules={[{ required: true, message: 'Por favor, ingresa el género' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone_number" label="Número de Teléfono" rules={[{ required: true, message: 'Por favor, ingresa el número de teléfono' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="medical_conditions" label="Condiciones Médicas">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="oral_health_level" label="Nivel de Salud Oral">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdatePatientAsDoctor.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  patient: PropTypes.object,
  token: PropTypes.string.isRequired,
  refreshPatients: PropTypes.func.isRequired,
};

export default UpdatePatientAsDoctor;
