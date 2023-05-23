import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

type ModalContainerProps = {
  title: string;
  children: React.ReactNode;
  navigateRoute: string;
};

const ModalContainer = ({
  title,
  children,
  navigateRoute,
}: ModalContainerProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={true}
      fullscreen={true}
      onHide={() => {
        navigate(navigateRoute);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
