import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { UserOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const SidebarLarge = ({ menuItems }) => {
  const location = useLocation();

  const iconMap = {
    user: <UserOutlined />,
    calendar: <CalendarOutlined />,
    file: <FileOutlined />,
  };

  const menuItemsAntD = menuItems.map((item) => ({
    key: item.path,
    icon: typeof item.icon === 'string' ? iconMap[item.icon] : item.icon,
    label: <Link to={item.path}>{item.name}</Link>,
  }));

  return (
    <Sider width={256} className="flex flex-col h-screen border-r border-gray-300">
      <div className="flex-grow flex flex-col">
        <div className="p-4 text-center border-b border-gray-300">
          <h1 className="text-2xl font-bold text-primaryBlue">DentalNet</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItemsAntD}
          style={{ borderRight: 0 }}
        />
      </div>
      <div className="p-4">
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
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ).isRequired,
};

export default SidebarLarge;
