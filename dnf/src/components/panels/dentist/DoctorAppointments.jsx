import { useEffect, useState, useContext } from 'react';
import { Table, Spin, message } from 'antd';
import { AuthContext } from '../../../context/AuthContext';
import { getAppointmentsByDoctor } from '../../../services/api';

const DoctorAppointments = () => {
  const { user } = useContext(AuthContext);
  const token = user ? user.token : null;
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

    if (token) {
      fetchAppointments();
    }
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
