import React from 'react';

import RegistrationImage from '../../resources/images/registration-image.png';
import FormHeader from '../FormHeader/FormHeader';
import './FormContainer.scss';

const FormContainer = ({ children, onClick }: any) => {
  return (
    <div className="form-page-wrapper">
      <div className="form-page-container">
        <div className="image-container">
          <img className="image" src={RegistrationImage} alt="form-pic" />
        </div>
        <div className="form-container">
          <FormHeader onClick={onClick} />
          <div className="form-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
