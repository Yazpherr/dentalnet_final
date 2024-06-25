import { Outlet } from 'react-router-dom';
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';
import PatientsIcon from "../../../assets/icons/PatientsIcon";
import PrescriptionIcon from "../../../assets/icons/PrescriptionIcon";
import DiaryIcon from "../../../assets/icons/DiaryIcon";

const menuItems = [
  { name: "Pacientes", path: "/doctor/patients", icon: <PatientsIcon />  },
  { name: "Recetas", path: "/doctor/prescriptions", icon: <PrescriptionIcon /> },
  { name: "Mi Agenda", path: "/doctor/appointments", icon: <DiaryIcon /> },
];

const DentistLayout = () => {
  return (
    <div className="flex">
      <div className="hidden md:block">
        <SidebarLarge menuItems={menuItems} />
      </div>
      <div className="block md:hidden">
        <SidebarResponsive menuItems={menuItems} />
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DentistLayout;
