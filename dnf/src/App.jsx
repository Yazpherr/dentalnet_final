import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import PatientPanel from "./components/panels/patient/PatientPanel";
import DoctorPanel from "./components/panels/dentist/DoctorPanel";
import AdminPanel from "./components/panels/admin/AdminPanel";

import Home from "./views/Home";
import AdminLayout from "./components/panels/admin/AdminLayout";
import RegisterDentist from "./components/panels/admin/RegisterDentist";

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
                <PatientPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute roles={["doctor"]}>
                <DoctorPanel />
              </ProtectedRoute>
            }
          />
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
            {/* Puedes agregar más rutas dentro del admin aquí */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
