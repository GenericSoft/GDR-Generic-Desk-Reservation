import React from 'react';

import './FormHeader.scss';

import Logo from '../../resources/images/gs-logo.png';

type FormHeaderProps = {
  onClick: () => void;
  isLoginPage: boolean;
};

const FormHeader = ({ onClick, isLoginPage }: FormHeaderProps) => {
  return (
    <div className="form-header">
      <div className="form-title-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="form-btn-container">
        <span className="small">Switch to</span>
        <span className="redirect-btn" onClick={onClick}>
          {isLoginPage ? ' Register' : ' Login'}
        </span>
      </div>
    </div>
  );
};

export default FormHeader;
