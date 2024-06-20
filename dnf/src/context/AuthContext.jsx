import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Redirigir basado en el rol del usuario
    switch(userData.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'doctor':
        navigate('/doctor');
        break;
      case 'patient':
        navigate('/patient');
        break;
      default:
        navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};