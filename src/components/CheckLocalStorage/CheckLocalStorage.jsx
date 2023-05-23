import React, { useState, useEffect } from 'react';

import { useRoomActions } from '../../redux/reducers/imageMapReducer';

const CheckLocalStorage = () => {
  const [localStorageData, setLocalStorageData] = useState(
    localStorage.getItem('imageMapProSaves')
  );

  // const { setRoom } = useRoomActions;

  // console.log(JSON.parse(localStorageData));

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

  const handleSaveToLocalStorage = () => {
    // console.log('CLICK ');
    // setTimeout(() => {
    //   const saveBtnIcon = document.querySelector('.save-button');
    //   console.log(saveBtnIcon);
    //   // const saveBtn = saveBtnIcon.parentElement;
    // }, 5000);
    // const storage = localStorage.getItem('imageMapProSaves');
    // console.log(storage);
    // setLocalStorageData(event.newValue);
    // setRoom({ imageSetup: event.newValue, reservedDesks: [] });
  };

  useEffect(() => {
    // console.log('useEffect');
    // window.addEventListener('storage', handleLocalStorageChange);
    // const saveBtnIcon = document.querySelector('.fa-save');
    // saveBtn.classList.add('save-button');
    // console.log(saveBtn.classList);
    // saveBtn.addEventListener('click', handleSaveToLocalStorage);
    // console.log(saveBtnIcon);
    // console.log(saveBtn);
    // return () => {
    //   window.removeEventListener('storage', handleLocalStorageChange);
    // };
  }, []);

  return null;
};

export default CheckLocalStorage;
