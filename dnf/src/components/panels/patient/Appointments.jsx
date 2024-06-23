import { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContext } from '../../../context/AuthContext';
import { getPatientAppointments } from '../../../services/api';

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado del contexto

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(user.token); // Pasar el token del usuario
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (user && user.token) {
      fetchAppointments();
    }
  }, [user]);

  const events = appointments.map(appointment => ({
    title: appointment.reason,
    start: new Date(appointment.date),
    end: new Date(appointment.date),
  }));

  return (
    <div>
      <h2>Mis Citas</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Appointments;
