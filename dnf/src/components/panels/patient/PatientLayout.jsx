import { Outlet } from 'react-router-dom';
// SIDEBAR
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';

// IMPORTACION DE ICONOS
import HomeIcon from "../../../assets/icons/HomeIcon";
import AppointmentIcon from "../../../assets/icons/AppointmentIcon";
import DiaryIcon from "../../../assets/icons/DiaryIcon";
import DiaryModIcon from "../../../assets/icons/DiaryModIcon";
import PrescriptionIcon from "../../../assets/icons/PrescriptionIcon";

const menuItems = [
  { name: 'Dashboard', path: '/patient/dashboard', icon: <HomeIcon /> },
  { name: 'Crear cita', path: '/patient/create-appointment', icon: <AppointmentIcon /> },
  { name: 'Mis citas', path: '/patient/my-appointments', icon: <DiaryModIcon /> },
  { name: 'Agenda', path: '/patient/appointments', icon: <DiaryIcon /> },
  { name: 'Recetas', path: '/patient/prescriptions', icon: <PrescriptionIcon /> },
];

const PatientLayout = () => {
  return (
    <div className="h-screen flex">
      <div className="hidden md:flex md:flex-col h-full">
        <SidebarLarge menuItems={menuItems} />
      </div>
      <div className="block md:hidden h-full">
        <SidebarResponsive menuItems={menuItems} />
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;
