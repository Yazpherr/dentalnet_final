import { useEffect, useState, useContext } from 'react';
import { Table, Button, message, Spin, Modal } from 'antd';
import { AuthContext } from '../../../context/AuthContext';
import { getPatientAppointments, cancelAppointment } from '../../../services/api';

const MyAppointments = () => {
  const { user } = useContext(AuthContext);
  const token = user ? user.token : null;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        message.error('Error al obtener las citas');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const showCancelModal = (id) => {
    setAppointmentToCancel(id);
    setModalVisible(true);
  };

  const handleCancelAppointment = async () => {
    setConfirmLoading(true);
    try {
      await cancelAppointment(token, appointmentToCancel);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentToCancel));
      message.success('Cita cancelada con éxito');
    } catch (error) {
      message.error('Error al cancelar la cita');
    } finally {
      setConfirmLoading(false);
      setModalVisible(false);
    }
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Razón',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Button
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => showCancelModal(record.id)}
        >
          Cancelar Cita
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table dataSource={appointments} columns={columns} rowKey="id" />
      <Modal
        title="Confirmar Cancelación"
        visible={modalVisible}
        onOk={handleCancelAppointment}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModal}
        okText="Aceptar"
        cancelText="Cancelar"
      >
        <p>¿Estás seguro de que deseas cancelar esta cita?</p>
      </Modal>
    </Spin>
  );
};

export default MyAppointments;
