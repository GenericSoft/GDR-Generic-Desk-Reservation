import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../redux/store';

import { saveImageMapToFirebase } from '../../redux/reducers/imageMapReducer';

import ModalContainer from '../../components/ModalContainer/ModalContainer';

const ImageMapProEditor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/editor/main.js`;

    const script = document.createElement('script');
    script.src = srcFilePath;
    script.async = true;
    script.id = 'editor-script';
    document.querySelector('#root .App').appendChild(script);

    return () => {
      const stylesElements = document.querySelectorAll('.editor-styles');
      const svelteStyles = document.querySelectorAll('[id^="svelte"]');

      handleSave();
      document.querySelector('#root .App').removeChild(script);
      svelteStyles.forEach((el) => el.remove());
      stylesElements.forEach((el) => el.remove());
    };
  }, []);

  const handleSave = () => {
    const imageMapJSON = localStorage.getItem('imageMapProSaves');

    dispatch(saveImageMapToFirebase(imageMapJSON));
  };

  return (
    <ModalContainer title="Editor" navigateRoute="/calendar">
      <div id="image-map-pro-editor"></div>
    </ModalContainer>
  );
};

export default ImageMapProEditor;
