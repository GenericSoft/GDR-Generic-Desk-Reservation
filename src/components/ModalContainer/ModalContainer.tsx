import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import './ModalContainer.scss';

type ModalContainerProps = {
  title: string;
  children: React.ReactNode;
  navigateRoute: string;
  modalClass?: string;
};

const ModalContainer = ({
  title,
  children,
  navigateRoute,
  modalClass,
}: ModalContainerProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={true}
      fullscreen={true}
      onHide={() => {
        navigate(navigateRoute);
      }}
      dialogClassName={
        'modal-container-' +
        location.pathname.replace(/\//g, '') +
        ' ' +
        modalClass
      }
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className="text-white">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
