import React, { useEffect, useState } from 'react';

import './ImageMapPro.scss';

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
      // eslint-disable-next-line
      //   console.log(ImageMapPro);
      //   console.log(JSON.parse(localStorageData)[0]);

      // eslint-disable-next-line
      ImageMapPro.subscribe((action) => {
        if (action.type === 'objectClick') {
          // Do something
          const id = action.payload.object;

          const img = document.querySelector(
            'div[data-object-id="' + id + '"]'
          );
          // img.style.background = 'green';

          if (img.style.background == 'green') {
            img.style.background = 'red';
            console.log('ifaaa');
            console.log(img.style.background);
          } else {
            img.style.background = 'green';
            console.log('elseaaa');
            console.log(img.style.background);
          }

          // console.log(action);
        }
      });

      // if (image.style.background === 'green') {
      //   image.style.background = 'red';
      //   console.log('wtf1');
      // } else {
      //   image.style.background = 'green';
      //   console.log('wtf2');
      // }
    };

    // eslint-disable-next-line
    // ImageMapPro.unsubscribe(0);

    // eslint-disable-next-line
    // console.log(ImageMapPro.unsubscribe());
    // eslint-disable-next-line
    // return () => ImageMapPro.unsubscribe(0);
  }, []);

  // useEffect(() => {
  //   const img = image;
  //   if (img.style.background === 'green') {
  //     img.style.background = 'red';
  //     console.log('wtf1');
  //   } else {
  //     img.style.background = 'green';
  //     console.log('wtf2');
  //   }

  //   setImage(img);
  // }, [image]);

  return <div id="image-map-pro"></div>;
};

export default ImageMapProView;
