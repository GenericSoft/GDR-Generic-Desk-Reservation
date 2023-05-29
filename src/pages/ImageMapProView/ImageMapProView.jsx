import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useAppSelector } from '../../redux/store';

import ModalContainer from '../../components/ModalContainer/ModalContainer';

import { saveDateRequest } from '../../api/reservationDeskBackend/calendarApi';

import './ImageMapPro.scss';

const ImageMapProView = () => {
  const localStorageData = localStorage.getItem('imageMapProSaves');
  const [deskId, setDeskId] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.user.userId);

  const currDate = location.state.currDate;
  const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/image-map-pro.min.js`;

  useEffect(() => {
    // if (!document.getElementById('view-script'))
    const script = document.createElement('script');
    script.src = srcFilePath;
    script.async = true;
    script.id = 'view-script';

    // const script = document.getElementById('view-script');

    document.querySelector('#root .App').appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line
      ImageMapPro.init('#image-map-pro', JSON.parse(localStorageData)[0]);

      // explain in comment what it does
      // eslint-disable-next-line
      ImageMapPro.subscribe((action) => {
        if (action.type === 'objectClick') {
          const id = action.payload.object;

          setDeskId(id);

          const img = document.querySelector(
            'div[data-object-id="' + id + '"]'
          );
          const attribute = img.getAttribute('data-title');

          if (attribute !== 'Text') {
            if (!img.style.background) {
              img.style.background = 'green';
            }

            if (img.style.background === 'green') {
              img.style.background = 'red';
            } else {
              img.style.background = 'green';
            }
          }
        }
      });
    };

    // eslint-disable-next-line
    // ImageMapPro.unsubscribe(0);

    // eslint-disable-next-line
    // eslint-disable-next-line
    return () => {
      const stylesElements = document.querySelectorAll('.viewer-styles');
      document.querySelector('#root .App').removeChild(script);
      stylesElements.forEach((el) => el.remove());
    };
  }, []);

  const handleOnClick = () => {
    const allDayData = {
      date: currDate,
      deskId,
      userId,
    };

    saveDateRequest(allDayData);
    navigate('/dashboard');
  };

  return (
    <div>
      {/* <Helmet>
        <script id="view-script" src={srcFilePath}></script>
      </Helmet> */}
      <ModalContainer
        title="Viewer"
        navigateRoute="/dashboard"
        handleOnClick={handleOnClick}
      >
        <div id="image-map-pro"></div>
      </ModalContainer>
    </div>
  );
};

export default ImageMapProView;
