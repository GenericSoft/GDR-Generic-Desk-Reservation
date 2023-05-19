import React, { useState, useEffect } from 'react';

const CheckLocalStorage = () => {
  const [localStorageData, setLocalStorageData] = useState(
    localStorage.getItem('imageMapProSaves')
  );

  console.log(JSON.parse(localStorageData));

  useEffect(() => {
    const handleLocalStorageChange = (event) => {
      if (
        event.storageArea === localStorage &&
        event.key === 'imageMapProSaves'
      ) {
        setLocalStorageData(event.newValue);
      }
    };
    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  return null;
};

export default CheckLocalStorage;
