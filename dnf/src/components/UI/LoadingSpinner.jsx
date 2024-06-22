// src/components/UI/LoadingSpinner.jsx


import LogoIcon from '../../assets/icons/secureTooth';
import './LoadinSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner">
      <LogoIcon className="logo-icon" />
      <div className="spinner-circle"></div>
    </div>
  </div>
);

export default LoadingSpinner;