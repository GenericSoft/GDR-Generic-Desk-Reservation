import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/store';

import ModalContainer from '../../components/ModalContainer/ModalContainer';

import {
  saveDateRequest,
  getReservedDesksByDate,
} from '../../api/reservationDeskBackend/calendarApi';

import {
  getImageMapIdRequest,
  getImageMapJSONRequest,
} from '../../api/reservationDeskBackend/imageMapApi';

import { waitForElementToBeAppended } from '../../utils/waitForElementToBeAppended';
import './ImageMapPro.scss';

const ImageMapProView = () => {
  const [deskId, setDeskId] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const [imageMapJSON, setImageMapJSON] = useState('');

  const userId = useAppSelector((state) => state.user.userId);

  const currDate = location.state.currDate;
  const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/image-map-pro.min.js`;

  const fetchReservedDesks = async (currDate) => {
    const desks = await getReservedDesksByDate(currDate);
    if (desks) {
      desks.data().desks.forEach((element) => {
        document.querySelector(
          'div[data-object-id="' + element.deskId + '"]'
        ).style.background = 'red';
        document
          .querySelector('div[data-object-id="' + element.deskId + '"]')
          .setAttribute('reserved', 'reserved');
      });
    }
  };

  const getImageMapJSON = async () => {
    const imageId = await getImageMapIdRequest();

    const json = await getImageMapJSONRequest(imageId);

    setImageMapJSON(json);
  };

  useEffect(() => {
    getImageMapJSON();
  }, []);

  useEffect(() => {
    if (imageMapJSON) {
      const script = document.createElement('script');

      script.src = srcFilePath;
      script.async = true;

      script.id = 'view-script';

      document.querySelector('#root .App').appendChild(script);

      script.onload = () => {
        // eslint-disable-next-line
        ImageMapPro.init('#image-map-pro', JSON.parse(imageMapJSON)[0]);

        //show reserved desks
        fetchReservedDesks(currDate);

        waitForElementToBeAppended(
          '.imp-objects',
          document.getElementById('image-map-pro')
        ).then((elm) => {
          document.querySelectorAll('.imp-object').forEach((img) => {
            img.addEventListener('click', () => {
              const id = img.getAttribute('data-object-id');
              if (!img.getAttribute('reserved')) {
                setDeskId(id);

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
              } else {
                alert('This desk is already reserved for the day!');
              }
            });
          });
        });
      };
    }
    return () => {
      const stylesElements = document.querySelectorAll('.viewer-styles');
      document
        .querySelector('#root .App')
        .removeChild(document.getElementById('view-script'));
      stylesElements.forEach((el) => el.remove());
    };
  }, [imageMapJSON]);

  const handleOnClick = async () => {
    const allDayData = {
      date: currDate,
      deskId,
      userId,
    };

    if (deskId) {
      await saveDateRequest(allDayData);
      navigate('/dashboard');
    } else {
      alert('Please, select a desk!');
    }
  };

  return (
    <div>
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
