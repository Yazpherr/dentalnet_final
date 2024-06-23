// src/components/panels/patient/PatientLayout.jsx

import { Outlet } from 'react-router-dom';
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';

const menuItems = [
  { name: 'Perfil', path: '/patient/dashboard', icon: 'user' },
  { name: 'Citas', path: '/patient/appointments', icon: 'calendar' },
  { name: 'Recetas', path: '/patient/prescriptions', icon: 'file' },
];

const PatientLayout = () => {
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

export default PatientLayout;
