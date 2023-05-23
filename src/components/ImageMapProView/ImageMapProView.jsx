import React, { useEffect, useState } from 'react';

import './ImageMapPro.scss';
import ModalContainer from '../Modal/Modal';

const ImageMapProView = () => {
  // const [image, setImage] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(
    localStorage.getItem('imageMapProSaves')
  );

  // console.log('image', image);

  useEffect(() => {
    const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/image-map-pro.min.js`;

    const script = document.createElement('script');
    script.src = srcFilePath;
    script.async = true;

    script.id = 'view-script';

    document.querySelector('#root .App').appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line
      ImageMapPro.init('#image-map-pro', JSON.parse(localStorageData)[0]);

      // console.log('OBJECT', JSON.parse(localStorageData)[0]);
      // eslint-disable-next-line
      //   console.log(ImageMapPro);
      //   console.log(JSON.parse(localStorageData)[0]);

      // eslint-disable-next-line
      ImageMapPro.subscribe((action) => {
        if (action.type === 'objectClick') {
          // Do something
          const id = action.payload.object;

          console.log(action.payload);

          const img = document.querySelector(
            'div[data-object-id="' + id + '"]'
          );
          const attribute = img.getAttribute('data-title');

          console.log(attribute);

          if (attribute !== 'Text') {
            console.log('HEY');

            console.log(img.style);
            console.log(img.style.background);

            if (!img.style.background) {
              console.log('HERE');
              img.style.background = 'green';
            }

            if (img.style.background === 'green') {
              img.style.background = 'red';
              console.log('change to red');
              console.log(img.style.background);
            } else {
              img.style.background = 'green';
              console.log('change to green');
              console.log(img.style.background);
            }
          }
        }
      });
    };

    // eslint-disable-next-line
    // ImageMapPro.unsubscribe(0);

    // eslint-disable-next-line
    // console.log(ImageMapPro.unsubscribe());
    // eslint-disable-next-line
    // return () => ImageMapPro.unsubscribe(0);
  }, []);

  return (
    <ModalContainer title="Viewer" navigateRoute="/dashboard">
      <div id="image-map-pro"></div>
    </ModalContainer>
  );
};

export default ImageMapProView;
