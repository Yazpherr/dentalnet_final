import { Link } from 'react-router-dom';
import { FiHome, FiUserPlus, FiClipboard, FiLogOut } from 'react-icons/fi';

const SidebarLarge = ({ menuItems }) => {
  return (
    <div className="w-64 h-screen bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primaryBlue">DentalNet</h1>
      </div>
      <ul className="mt-6">
        {menuItems.map((item, index) => (
          <li key={index} className="my-2">
            <Link to={item.path} className="flex items-center text-gray-700 hover:text-green-600 p-2 rounded transition duration-300">
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className="absolute bottom-4 left-4 bg-red-500 text-white py-2 px-4 rounded" onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>
        <FiLogOut className="inline w-5 h-5 mr-2" />
        Cerrar sesión
      </button>
    </div>
  );
};

export default SidebarLarge;
