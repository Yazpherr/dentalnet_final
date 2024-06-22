import useRutFormatter from '../../../components/hooks/useRutFormatter';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Table, Spin, message } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { getDentists, registerDentist } from '../../../services/api';
import 'antd/dist/reset.css';

const RegisterDentist = () => {
  const [form] = Form.useForm();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dentists, setDentists] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rut, formatRut, setRut] = useRutFormatter();

  useEffect(() => {
    const fetchDentists = async () => {
      setIsLoadingData(true);
      try {
        const token = localStorage.getItem('token');
        const response = await getDentists(token);
        setDentists(response.data.dentists);
      } catch (error) {
        message.error('Error al cargar los dentistas');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDentists();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    form.resetFields();
    setRut('');
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await registerDentist(token, { ...values, dni: rut });
      message.success('Dentista registrado correctamente');
      closeModal();
      const newResponse = await getDentists(token);
      setDentists(newResponse.data.dentists);
    } catch (error) {
      message.error('Error al registrar el dentista');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          icon={<FiPlus />}
          onClick={openModal}
          className="bg-primaryBlue text-white hover:bg-blue-800"
        >
          Agregar Dentista
        </Button>
      </div>

      {isLoadingData ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={dentists} columns={[
          { title: 'Nombre', dataIndex: 'name', key: 'name' },
          { title: 'Correo Electrónico', dataIndex: 'email', key: 'email' },
          { title: 'DNI', dataIndex: 'dni', key: 'dni' },
          { title: 'Dedicación', dataIndex: 'dedication', key: 'dedication' }
        ]} rowKey="id" className="bg-white shadow-md rounded-lg" />
      )}

      <Modal
        title="Registrar Dentista"
        visible={modalIsOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="dni" label="DNI" rules={[{ required: true, message: 'Por favor ingrese el DNI' }]}>
            <Input value={rut} onChange={(e) => formatRut(e.target.value)} maxLength={10} />
          </Form.Item>
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, message: 'Por favor ingrese el correo electrónico' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="password_confirmation" label="Confirmar Contraseña" rules={[{ required: true, message: 'Por favor confirme la contraseña' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="dedication" label="Dedicación" rules={[{ required: true, message: 'Por favor ingrese la dedicación' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Registrar Dentista
            </Button>
            <Button onClick={closeModal} style={{ marginLeft: '10px' }}>
              Cerrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterDentist;
