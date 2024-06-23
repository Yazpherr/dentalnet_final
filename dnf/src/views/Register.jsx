import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import NavBarSoloLogo from '../components/home/NavBarSoloLogo';
import axios from 'axios';
import PasswordValidation from '../components/secure/PasswordValidation';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      });
      localStorage.setItem('token', response.data.token);
      message.success('¡Registro exitoso!');
      navigate('/login');
    } catch (error) {
      message.error('Error en el registro. Por favor verifica tus datos.');
    }
  };

  return (
    <>
      <NavBarSoloLogo Url="/" />
      <section className="flex flex-col justify-between min-h-screen">
        <div className="px-6 my-[120px]">
          <div className="mb-12 text-center">
            <p className="text-blue-800 font-semibold uppercase mb-4">
              Registro
            </p>
            <h2 className="max-w-[800px] mx-auto text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Bienvenido a DentalNet
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-5 max-w-[800px] mx-auto">
              Ingresa tus datos para registrarte
            </p>
          </div>
          <Form
            form={form}
            onFinish={handleRegister}
            className="mx-auto max-w-[500px] bg-white p-6 rounded-md shadow-md"
            labelCol={{ span: 24 }}
          >
            <Form.Item
              name="name"
              label={<span className="block text-sm font-bold mb-1">Nombre</span>}
              rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
            >
              <Input placeholder="Ingresar nombre" className="rounded-md" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="block text-sm font-bold mb-1">Correo electrónico</span>}
              rules={[{ required: true, type: 'email', message: 'Por favor ingresa un correo electrónico válido' }]}
            >
              <Input placeholder="Ingresar correo electrónico" className="rounded-md" />
            </Form.Item>
            <PasswordValidation form={form} />
            <Form.Item
              name="passwordConfirmation"
              label={<span className="block text-sm font-bold mb-1">Confirmar Contraseña</span>}
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Por favor confirma tu contraseña' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmar contraseña" className="rounded-md" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-[49px] bg-gradient-to-r from-blue-500 to-blue-800 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300">
              Registrarse
            </Button>
          </Form>
          <div className="mx-auto max-w-[500px] text-center mt-4">
            <Link to="/login" className="text-gray-700 text-sm">
              ¿Ya tienes cuenta? <span className="text-blue-800">Inicia sesión aquí</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
