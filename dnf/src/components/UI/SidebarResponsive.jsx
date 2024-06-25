import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Drawer, Button, Menu } from 'antd';

const SidebarResponsive = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full">
      {/* Mobile header */}
      <div className="bg-white shadow-md flex justify-between items-center p-4 md:hidden fixed top-0 w-full z-30">
        <Button onClick={toggleSidebar}>
          <FiMenu className="w-6 h-6 text-gray-700" />
        </Button>
        <h1 className={`text-2xl font-bold text-primaryBlue`}>DentalNet</h1>
      </div>

      {/* Sidebar Drawer */}
      <Drawer
        title="DentalNet"
        placement="left"
        closable={true}
        onClose={toggleSidebar}
        visible={isOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline">
          {menuItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <Link to={item.path} onClick={toggleSidebar}>
                {item.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className="p-4">
          <Button
            type="primary"
            danger
            className="w-full flex items-center justify-center"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            <FiLogOut className="inline w-5 h-5 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

SidebarResponsive.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired, // Acepta cualquier nodo React
    })
  ).isRequired,
};

export default SidebarResponsive;
