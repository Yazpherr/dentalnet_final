import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { login as authLogin } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import NavBarSoloLogo from '../components/home/NavBarSoloLogo';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await authLogin(values.email, values.password);
      localStorage.setItem('token', response.data.token);
      login(response.data.user);

      // Redirige al usuario según su rol
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else if (response.data.user.role === 'doctor') {
        navigate('/doctor');
      } else if (response.data.user.role === 'patient') {
        navigate('/patient');
      } else {
        navigate('/'); // Redirige al home o a un panel por defecto
      }
    } catch (error) {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <>
      <NavBarSoloLogo Url="/" />
      <section className="flex flex-col justify-between min-h-screen">
        <div className="px-6 my-[20px]">
          <div className="mb-12 text-center">
            <p className="text-blue-800 font-semibold uppercase mb-4">
              Inicio de sesión
            </p>
            <h2 className="max-w-[800px] mx-auto text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Bienvenido a DentalNet
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-5 max-w-[800px] mx-auto">
              Ingresa tus datos para acceder
            </p>
          </div>
          <div className="form-container mx-auto max-w-[500px] bg-white p-6 rounded shadow-md">
            <Form
              onFinish={handleLogin}
              layout="vertical"
            >
              <div className="error-container">
                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}
              </div>
              <Form.Item
                label={<span className="custom-label">Correo electrónico</span>}
                name="email"
                rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
              >
                <Input
                  className="custom-input"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="custom-label">Contraseña</span>}
                name="password"
                rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
              >
                <Input.Password
                  className="custom-input"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full h-10 custom-login-button">
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
            <div className="mx-auto max-w-[500px] text-center mt-4">
              <Link to="/register" className="text-gray-700 text-sm">
                ¿Aún no tienes cuenta? <span className="text-blue-800">Regístrate aquí</span>
              </Link>
              <br />
              <Link to="/request-reset-password" className="text-gray-700 text-sm">
                <span className="text-blue-800">¿Olvidaste tu contraseña?</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
