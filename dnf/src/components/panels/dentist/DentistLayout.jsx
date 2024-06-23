// src/components/panels/dentist/DentistLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarLarge from '../../microcomponents/SidebarLarge';
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
      <SidebarLarge menuItems={menuItems} />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DentistLayout;
