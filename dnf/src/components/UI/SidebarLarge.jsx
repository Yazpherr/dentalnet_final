import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Layout, Menu } from 'antd';
import HomeIcon from '../../assets/icons/HomeIcon'; // Importar el nuevo icono
import AddDentistIcon from '../../assets/icons/AddDentistIcon'; // Importar el icono de AddDentist
import PropTypes from 'prop-types';

const { Sider } = Layout;

const SidebarLarge = ({ menuItems }) => {
  const location = useLocation();

  // Mapear menuItems a la estructura que requiere Ant Design
  const menuItemsAntD = menuItems.map((item) => ({
    key: item.path,
    icon: item.path === '/admin' ? <HomeIcon className="w-5 h-5 mr-2" /> : item.path === '/register-dentist' ? <AddDentistIcon className="w-5 h-5 mr-2" /> : <item.icon className="w-5 h-5 mr-2" />,
    label: <Link to={item.path}>{item.name}</Link>,
  }));

  return (
    <Sider width={256} className="site-layout-background flex flex-col h-screen border-r border-gray-300">
      <div className="flex-grow">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-primaryBlue">DentalNet</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItemsAntD} // Usar items en lugar de children
          style={{ borderRight: 0 }}
        />
      </div>

      {/* Boton de cerrar sesion */}
      <div className="p-4 mt-auto">
        <button
          className="w-full bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          <FiLogOut className="w-5 h-5 mr-2" />
          Cerrar sesión
        </button>
      </div>
    </Sider>
  );
};

SidebarLarge.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default SidebarLarge;
