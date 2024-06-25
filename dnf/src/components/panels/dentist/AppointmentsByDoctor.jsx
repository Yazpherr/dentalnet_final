import { useEffect, useState } from 'react';
import { getAppointmentsByDoctor } from '../../../services/api';
import { Table, Spin, message } from 'antd';

const DoctorAppointments = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointmentsByDoctor(token);
        setAppointments(response.data);
      } catch (error) {
        message.error('Error al obtener las citas');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const columns = [
    {
      title: 'Paciente',
      dataIndex: ['patient', 'user', 'name'],
      key: 'patient_name',
    },
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
  ];

  return (
    <Spin spinning={loading}>
      <Table dataSource={appointments} columns={columns} rowKey="id" />
    </Spin>
  );
};

export default DoctorAppointments;
