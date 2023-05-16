import React from 'react';

import './FormHeader.scss';

import Logo from '../../resources/images/gs-logo.png';

type FormHeaderProps = {
  onClick: () => void;
};

const FormHeader = ({ onClick }: FormHeaderProps) => {
  return (
    <div className="form-header">
      <div className="form-title-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="form-btn-container" onClick={onClick}>
        <span className="small">Switch to</span>
        <span> Login</span>
      </div>
    </div>
  );
};

export default FormHeader;
