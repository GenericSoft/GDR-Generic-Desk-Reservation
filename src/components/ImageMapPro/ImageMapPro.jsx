import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import { saveImageToFirebaseRequest } from '../../api/reservationDeskBackend/imageMapApi';
import { saveImageMapToFirebase } from '../../redux/reducers/imageMapReducer';
import { useAppDispatch } from '../../redux/store';
import ModalContainer from '../Modal/Modal';

const ImageMapPro = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const handleLocalStorageChange = (event) => {
    console.log('event');
    if (
      event.storageArea === localStorage &&
      event.key === 'imageMapProSaves'
    ) {
      console.log(event.newValue);
      // setLocalStorageData(event.newValue);
      // setRoom({ imageSetup: event.newValue, reservedDesks: [] });
    } else {
      console.log('hujdkshfd');
    }
  };
  useEffect(() => {
    const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/editor/main.js`;

    const script = document.createElement('script');
    script.src = srcFilePath;
    script.async = true;
    document.querySelector('#root .App').appendChild(script);

    // setTimeout(() => {
    //   const saveBtnIcon = document.querySelectorAll('.save-button');
    //   const saveBtn = saveBtnIcon.parentElement;

    //   console.log(saveBtn);
    // }, 5000);
    // window.addEventListener('storage', handleLocalStorageChange);

    window.onstorage = (event) => {
      console.log(event);
    };

    return () => {
      console.log('unmounting');
      handleSave();
    };
  }, []);

  function handleShow(breakpoint) {
    // setFullscreen(breakpoint);
    setShow(true);
  }

  const handleSave = () => {
    console.log('ala');
    const imageMapJSON = localStorage.getItem('imageMapProSaves');
    console.log('imageMapJSON', imageMapJSON);
    // saveImageToFirebaseRequest(imageMapJSON);
    dispatch(saveImageMapToFirebase(imageMapJSON));
  };

  return (
    // <Modal
    //   show={true}
    //   fullscreen={true}
    //   onHide={() => {
    //     // handleSave();
    //     navigate('/view');
    //   }}
    // >
    //   <Modal.Header closeButton>
    //     <Modal.Title>Modal</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <div id="image-map-pro-editor"></div>
    //   </Modal.Body>
    // </Modal>

    <ModalContainer title="Editor" navigateRoute="/view">
      <div id="image-map-pro-editor"></div>
    </ModalContainer>
  );
};

export default ImageMapPro;
