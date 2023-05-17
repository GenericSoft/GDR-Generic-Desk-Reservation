import React from 'react';

import RocketImage from '../../resources/images/rocket.png';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-image-container">
        <img className="footer-image" src={RocketImage} />
      </div>
      <div className="footer-content-container">
        <div className="footer-links">
          <ul>
            <li>
              <a href="https://genericsoft.eu/">genericsoft.eu</a>
            </li>
            <li>
              <a href="https://www.erp.genericsoft.eu/">erp.genericsoft.eu</a>
            </li>
          </ul>
        </div>
        <div className="footer-information">
          <div>E-mail: info@genericsoft.eu</div>
          <div>Copyright ©2022 Generic Soft All right reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
