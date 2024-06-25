import { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContext } from '../../../context/AuthContext';
import { getPatientAppointments } from '../../../services/api';

// Configuración para que el calendario esté en español
import 'moment/locale/es';
moment.locale('es');

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(user.token);
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
    start: moment(appointment.date).toDate(),
    end: moment(appointment.date).add(30, 'minutes').toDate(), // Ajusta la duración según sea necesario
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
        messages={{
          today: 'Hoy',
          previous: 'Atrás',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango',
          showMore: total => `+ Ver más (${total})`
        }}
      />
    </div>
  );
};

export default Appointments;
