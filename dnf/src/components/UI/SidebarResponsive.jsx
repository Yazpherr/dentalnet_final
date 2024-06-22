import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiUserPlus, FiClipboard, FiLogOut, FiX } from 'react-icons/fi';

const SidebarResponsive = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile header */}
      <div className="bg-white shadow-md flex justify-between items-center p-4 md:hidden fixed top-0 w-full z-30">
        <button onClick={toggleSidebar}>
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className={`text-2xl font-bold text-primaryBlue ${isOpen ? 'hidden' : 'block'}`}>DentalNet</h1>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black opacity-50" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-primaryBlue">DentalNet</h1>
          <button onClick={toggleSidebar}>
            <FiX className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <ul className="mt-6">
          {menuItems.map((item, index) => (
            <li key={index} className="my-2">
              <Link to={item.path} className="flex items-center text-gray-700 hover:text-green-600 p-2 rounded transition duration-300" onClick={toggleSidebar}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 w-full p-4">
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}>
            <FiLogOut className="inline w-5 h-5 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarResponsive;
