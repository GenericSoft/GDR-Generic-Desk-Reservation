import React from 'react';

import RocketImage from '../../resources/images/rocket.png';

import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faAt,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-image-container">
        <img className="footer-image" src={RocketImage} />
      </div>
      <div className="footer-content-container">
        <div className="footer-links">
          <div className="d-flex align-items-center">
            <div className="text-white">Explore our services: </div>
            <div className="circle-icon ms-3">
              <a href="https://genericsoft.eu/">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="lg"
                  style={{ color: '#724d7e' }}
                />
              </a>
            </div>
            <div className="circle-icon ms-3">
              <a href="https://www.erp.genericsoft.eu/">
                <FontAwesomeIcon
                  icon={faLink}
                  style={{ color: '#724d7e' }}
                  size="lg"
                />
              </a>
            </div>
            <div className="circle-icon ms-3">
              <a href="mailto:info@genericsoft.eu">
                <FontAwesomeIcon
                  icon={faAt}
                  size="lg"
                  style={{ color: '#724d7e' }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-information">
          {/* <div>E-mail: info@genericsoft.eu</div> */}
          <div>
            <small className="text-color-grey">
              Copyright ©2023 Generic Soft All right reserved
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
