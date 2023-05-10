import React from 'react';

import './FormHeader.scss';

import Logo from '../../resources/images/gs-logo.png';

const FormHeader = ({ onClick }: any) => {
  return (
    <div className="form-header">
      <div className="form-title-container">
        <img src={Logo} alt="logo" />
        <h1>Registration</h1>
      </div>
      <div className="form-btn-container">
        <button onClick={onClick} type="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default FormHeader;
