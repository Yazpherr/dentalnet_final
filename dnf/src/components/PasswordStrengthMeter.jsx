import zxcvbn from 'zxcvbn'; // Librería para analizar la robustez de la contraseña
import PropTypes from 'prop-types';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const progressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#e74c3c';
      case 1:
        return '#e67e22';
      case 2:
        return '#f1c40f';
      case 3:
        return '#2ecc71';
      case 4:
        return '#27ae60';
      default:
        return 'none';
    }
  };

  const progressStyle = {
    width: `${num}%`,
    backgroundColor: progressColor(),
    height: '8px', // Ajuste de altura
    borderRadius: '4px', // Bordes redondeados
  };

  return (
    <div className="password-strength-meter" style={{ marginTop: '4px' }}>
      <div className="progress" style={{ height: '8px', backgroundColor: '#e0e0df', borderRadius: '4px' }}>
        <div className="progress-bar" style={progressStyle}></div>
      </div>
    </div>
  );
};

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordStrengthMeter;
