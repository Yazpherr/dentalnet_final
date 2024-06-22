import { Outlet } from "react-router-dom";
import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FiHome, FiUserPlus, FiClipboard } from "react-icons/fi";

const AdminLayout = () => {
  const menuItems = [
    { name: "Inicio", path: "/admin", icon: FiHome },
    {
      name: "Registrar Dentista",
      path: "/admin/register-dentist",
      icon: FiUserPlus,
    },
    { name: "Citas", path: "/admin/appointments", icon: FiClipboard },
  ];

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

export default AdminLayout;
