import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './ModalContainer.scss';

type ModalContainerProps = {
  title: string;
  children: React.ReactNode;
  navigateRoute: string;
  handleOnClick?: () => void;
};

const ModalContainer = ({
  title,
  children,
  navigateRoute,
  handleOnClick,
}: ModalContainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal
      show={true}
      fullscreen={true}
      onHide={() => {
        navigate(navigateRoute);
      }}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className="text-white">{title}</Modal.Title>
        {/* //TODO: create a better variable for location */}
        {location.pathname === '/view' && (
          <Button className="modal-btn" onClick={handleOnClick}>
            Save
          </Button>
        )}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
