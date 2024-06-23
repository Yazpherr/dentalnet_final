import { useState, useEffect, useContext } from 'react';
import { Table, Button, Input, Form, message, Modal } from 'antd';
import { AuthContext } from '../../../context/AuthContext';
import { getAvailableSchedules, bookAppointment } from '../../../services/api';

const { Column } = Table;

const CreateAppointment = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [reason, setReason] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAvailableSchedules(user.token);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [user.token]);

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalVisible(true);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleBookAppointment = async () => {
    if (!selectedSchedule || !reason) {
      message.error('Please provide a reason.');
      return;
    }

    try {
      const appointmentData = {
        schedule_id: selectedSchedule.id,
        reason: reason,
        patient_id: user.id,
      };
      await bookAppointment(user.token, appointmentData);
      message.success('Appointment booked successfully!');
      setIsModalVisible(false);
      setReason('');
      setSelectedSchedule(null);
      // Actualizar los horarios disponibles
      const response = await getAvailableSchedules(user.token);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error booking appointment:', error);
      message.error('Error booking appointment.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setReason('');
    setSelectedSchedule(null);
  };

  return (
    <div>
      <h2 style={{ color: '#1890ff' }}>Crear Cita</h2>
      <div>
        <h3 style={{ color: '#1890ff' }}>Horarios Disponibles</h3>
        <Table
          dataSource={schedules}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        >
          <Column title="Día" dataIndex="day" key="day" />
          <Column title="Hora de Inicio" dataIndex="start_time" key="start_time" />
          <Column title="Hora de Fin" dataIndex="end_time" key="end_time" />
          <Column
            title="Acción"
            key="action"
            render={(text, record) => (
              <Button type="primary" onClick={() => handleScheduleSelect(record)}>
                Seleccionar
              </Button>
            )}
          />
        </Table>
      </div>
      <Modal
        title="Detalles de la Cita"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleBookAppointment}>
            Reservar Cita
          </Button>,
        ]}
      >
        <p>Paciente ID: {user.id}</p>
        {selectedSchedule && (
          <>
            <p>Horario ID: {selectedSchedule.id}</p>
            <p>
              Horario: {selectedSchedule.day} - {selectedSchedule.start_time} to {selectedSchedule.end_time}
            </p>
          </>
        )}
        <Form layout="vertical">
          <Form.Item label="Motivo de la cita">
            <Input
              value={reason}
              onChange={handleReasonChange}
              placeholder="Motivo de la cita"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAppointment;
