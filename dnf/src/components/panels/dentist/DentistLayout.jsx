// src/components/panels/dentist/DentistLayout.jsx
import { Outlet } from 'react-router-dom';
// import SidebarLarge from '../../microcomponents/SidebarLarge';
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';
import { FiHome, FiUser, FiClipboard } from 'react-icons/fi'; // Asegúrate de importar los iconos correctos

const menuItems = [
  { name: "Inicio", path: "/doctor", icon: FiHome },
  { name: "Pacientes", path: "/doctor/patients", icon: FiUser },
  { name: "Recetas", path: "/doctor/prescriptions", icon: FiClipboard },
  // agrega más items del menú según sea necesario
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
