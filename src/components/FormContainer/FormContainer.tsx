import React from 'react';

import RegistrationImage from '../../resources/images/registration-image.png';
import FormHeader from '../FormHeader/FormHeader';
import './FormContainer.scss';
import Footer from '../Footer/Footer';

type FormContainerProps = {
  children: React.ReactNode;
  onClick: () => void;
  isLoginPage: boolean;
};

const FormContainer = ({
  children,
  onClick,
  isLoginPage,
}: FormContainerProps) => {
  return (
    <div className="form-page-wrapper">
      <div className="blue-triangle1"></div>
      <div className="form-page-container">
        {!isLoginPage && (
          <div className="image-container">
            <img className="image" src={RegistrationImage} alt="form-pic" />
          </div>
        )}
        <div className={`form-container ${isLoginPage ? 'login' : ''}`}>
          <FormHeader onClick={onClick} isLoginPage={isLoginPage} />
          <div className="form-body">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormContainer;
