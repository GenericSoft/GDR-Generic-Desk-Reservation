import React, { useEffect } from 'react';

const ImageMapPro = () => {
  useEffect(() => {
    const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/editor/main.js`;

    const script = document.createElement('script');
    script.src = srcFilePath;
    script.async = true;
    document.querySelector('#root .App').appendChild(script);
  }, []);

  return (
    <>
      <div id="image-map-pro-editor"></div>
    </>
  );
};

export default ImageMapPro;
