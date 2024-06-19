import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Admin Panel</h1>
        <p>Welcome to the admin panel.</p>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
