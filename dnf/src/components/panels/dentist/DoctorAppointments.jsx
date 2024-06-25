// src/components/panels/doctor/DoctorAppointments.jsx

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const DoctorAppointments = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the doctor's appointments from the backend
    const token = localStorage.getItem('token'); // Asegúrate de tener el token de autenticación

    axios.get('http://127.0.0.1:8000/api/doctor/appointments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const appointments = response.data;
      // Map appointments to events for FullCalendar
      const events = appointments.map(appointment => ({
        title: `Cita con Paciente ${appointment.patient_id}`,
        start: appointment.date,
        extendedProps: {
          reason: appointment.reason
        }
      }));
      setEvents(events);
    })
    .catch(error => {
      console.error('Error fetching appointments:', error);
    });
  }, []);

  return (
    <div>
      <h2>Mis Citas</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        eventContent={renderEventContent} // Añadir contenido personalizado al evento
      />
    </div>
  );
};

// Función para renderizar el contenido del evento en el calendario
const renderEventContent = (eventInfo) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <p>{eventInfo.event.extendedProps.reason}</p>
    </>
  );
};

export default DoctorAppointments;
