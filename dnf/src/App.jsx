import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PatientPanel from './components/PatientPanel';
import DoctorPanel from './components/DoctorPanel';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">Welcome to the Application</h1>
          <div className="space-x-4">
            <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">Login</Link>
            <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded">Register</Link>
          </div>
          <Routes>
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
            <Route path="/" element={
              <div>
                <p>Hi</p>
              </div>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
