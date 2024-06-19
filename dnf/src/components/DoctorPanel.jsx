import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DoctorPanel = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Doctor Panel</h1>
        <p>Welcome to the doctor panel.</p>
        <button 
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorPanel;
