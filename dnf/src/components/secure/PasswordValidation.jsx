import { Input, Form, Progress } from 'antd';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';

const PasswordValidation = ({ form }) => {
  const [passwordStrength, setPasswordStrength] = useState({ score: 0 });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    if (value) {
      const result = zxcvbn(value);
      setPasswordStrength({
        score: result.score,
      });
      form.setFieldsValue({ password: value });
    } else {
      setPasswordStrength({ score: 0 });
      form.setFieldsValue({ password: value });
    }
  };

  const getPasswordStatus = () => {
    switch (passwordStrength.score) {
      case 0:
        return 'exception';
      case 1:
      case 2:
        return 'active';
      case 3:
      case 4:
        return 'success';
      default:
        return 'exception';
    }
  };

  return (
    <Form.Item
      name="password"
      label={<span className="block text-sm font-bold mb-1">Contraseña</span>}
      rules={[
        { required: true, message: 'Por favor ingresa una contraseña' },
        {
          min: 10,
          message: 'La contraseña debe tener al menos 10 caracteres.',
        },
      ]}
      hasFeedback
    >
      <>
        <Input.Password placeholder="Ingresar contraseña" onChange={handlePasswordChange} className="rounded-md" />
        <Progress percent={(passwordStrength.score + 1) * 20} status={getPasswordStatus()} showInfo={false} />
      </>
    </Form.Item>
  );
};

PasswordValidation.propTypes = {
  form: PropTypes.object.isRequired,
};

export default PasswordValidation;
