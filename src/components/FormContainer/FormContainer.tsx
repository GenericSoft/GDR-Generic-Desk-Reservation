import React from 'react';

import RegistrationImage from '../../resources/images/registration-image.png';
import FormHeader from '../FormHeader/FormHeader';
import './FormContainer.scss';

type FormContainerProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const FormContainer = ({ children, onClick }: FormContainerProps) => {
  return (
    <div className="form-page-wrapper">
      <div className="blue-triangle1"></div>
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
