import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PatientPanel from './components/PatientPanel';
import DoctorPanel from './components/DoctorPanel';
import AdminPanel from './components/AdminPanel';
import Home from './views/Home';


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
                <AdminPanel />
              </ProtectedRoute>
            } />
            
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
