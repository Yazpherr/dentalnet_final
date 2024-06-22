import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PatientPanel from './components/PatientPanel';
import DoctorPanel from './components/DoctorPanel';
import Home from './views/Home';
import AdminLayout from './components/microcomponents/AdminLayout';
import RegisterDentist from './components/RegisterDentist';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient" element={
            <ProtectedRoute roles={['patient']}>
              <PatientPanel />
            </ProtectedRoute>
          } />
          <Route path="/doctor" element={
            <ProtectedRoute roles={['doctor']}>
              <DoctorPanel />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminPanel />} />
            <Route path="register-dentist" element={<RegisterDentist />} />
            {/* Puedes agregar más rutas dentro del admin aquí */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
