import { useState, useEffect, useContext } from 'react';
import { Table, Button, Input, Form, Modal, message, Spin } from 'antd';
import { AuthContext } from '../../../context/AuthContext';
import { getAvailableSchedules, bookAppointment } from '../../../services/api';
import axios from 'axios';

const { Column } = Table;

const CreateAppointment = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [reason, setReason] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await getAvailableSchedules(user.token);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios disponibles:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/patient/details', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPatientId(response.data.id);
      } catch (error) {
        console.error('Error al obtener los detalles del paciente:', error);
      }
    };

    fetchSchedules();
    fetchPatientDetails();
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
      message.error('Por favor, seleccione un horario y proporcione un motivo.');
      return;
    }

    try {
      const appointmentData = {
        schedule_id: selectedSchedule.id,
        reason: reason,
        patient_id: patientId, // Usamos el patient_id obtenido de la tabla de pacientes
      };
      await bookAppointment(user.token, appointmentData);
      message.success('¡Cita reservada con éxito!');
      setIsModalVisible(false);
      // Refrescar o redirigir según sea necesario
    } catch (error) {
      console.error('Error al reservar la cita:', error);
      message.error('Error al reservar la cita.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2 style={{ color: '#1890ff' }}>Crear Cita</h2>
      <div>
        <h3 style={{ color: '#1890ff' }}>Horarios Disponibles</h3>
        <Spin spinning={loading}>
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
        </Spin>
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
        <p>Paciente ID: {patientId}</p>
        <p>Horario ID: {selectedSchedule?.id}</p>
        <p>Horario: {selectedSchedule?.day} - {selectedSchedule?.start_time} to {selectedSchedule?.end_time}</p>
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
