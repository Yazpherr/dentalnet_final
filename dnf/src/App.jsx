import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// PANEL ADMINISTRADOR
import AdminPanel from "./components/panels/admin/AdminPanel";
import AdminLayout from "./components/panels/admin/AdminLayout";
import RegisterDentist from "./components/panels/admin/RegisterDentist";

// PANEL DENTISTA
import DoctorPanel from "./components/panels/dentist/DentistPanel";
import DentistLayout from "./components/panels/dentist/DentistLayout";
import Appointments from './components/panels/patient/Appointments';
import DoctorAppointments from './components/panels/dentist/DoctorAppointments';
import Patients from "./components/panels/dentist/Patients";
import Prescriptions from "./components/panels/dentist/Prescriptions";

// PANEL PACIENTE 
import CreateAppointment from './components/panels/patient/CreateAppointment'; 
import PatientLayout from "./components/panels/patient/PatientLayout";
import PatientDashboard from "./components/panels/patient/PatientDashboard";
import PatientPrescriptions from "./components/panels/patient/PatientPrescriptions";

import MyAppointments from './components/panels/patient/MyAppointments';

import Home from "./views/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/patient"
            element={
              <ProtectedRoute roles={["patient"]}>
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="create-appointment" element={<CreateAppointment />} /> 
            {/* nueva ruta */}
            <Route path="my-appointments" element={<MyAppointments />} />   

          </Route>

          <Route
            path="/doctor"
            element={
              <ProtectedRoute roles={["doctor"]}>
                <DentistLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DoctorPanel />} />
            <Route path="patients" element={<Patients />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="appointments" element={<DoctorAppointments />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPanel />} />
            <Route path="register-dentist" element={<RegisterDentist />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
