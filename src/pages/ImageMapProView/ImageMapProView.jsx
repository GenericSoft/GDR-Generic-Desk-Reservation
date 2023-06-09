import React, { useEffect, useState } from 'react';
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

import {
  observeChangesOfChildren,
  waitForElementToBeAppended,
} from '../../utils/waitForElementToBeAppended';

import './ImageMapPro.scss';

const ImageMapProView = () => {
  const [deskId, setDeskId] = useState('');
  const [floorName, setFloorName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [imageMapJSON, setImageMapJSON] = useState('');

  const userId = useAppSelector((state) => state.user.userId);

  const currDate = location.state.currDate;
  const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/image-map-pro.min.js`;

  const fetchReservedDesks = async (currDate) => {
    const imageMapId = getImageMapId();

    const desks = await getReservedDesksByDate(currDate, imageMapId);
    if (desks) {
      desks.data().desks.forEach((element) => {
        document.querySelector(
          '[data-object-id="' + element.deskId + '"]'
        ).style.background = 'red';
        document
          .querySelector('[data-object-id="' + element.deskId + '"]')
          .setAttribute('reserved', 'reserved');
      });
    }
  };

  const getImageMapJSON = async () => {
    const imageId = await getImageMapIdRequest();

    const json = await getImageMapJSONRequest(imageId);

    setImageMapJSON(json);
  };

  const getImageMapId = () => {
    const selectEl = document.querySelector('.imp-ui-layers-select');
    let imageTitle = selectEl.options[selectEl.selectedIndex].text;

    const imageMap = JSON.parse(imageMapJSON)[0].artboards;

    for (const image of imageMap) {
      if (!image.id && image.title === imageTitle) {
        return 'default_id';
      }
      if (image.id && imageTitle === image.title) {
        return image.id;
      }
    }
  };

  const changeBackground = (element) => {
    element.forEach((img) => {
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
  };

  const handleOnClick = async () => {
    const allDayData = {
      date: currDate,
      deskId,
      userId,
    };

    if (deskId) {
      const imageMapId = getImageMapId();
      // save in the collection where the desks for the current floor are stored
      await saveDateRequest(allDayData, imageMapId);

      // save in the collection where data for all days is stored, it will be needed when rendering the information in the table where it's listed from where each user will work
      await saveDateRequest(allDayData);
      navigate('/dashboard');
    } else {
      alert('Please, select a desk!');
    }
  };

  useEffect(() => {
    getImageMapJSON();
  }, []);

  // USE EFFECTS

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

        waitForElementToBeAppended(
          '.imp-objects',
          document.getElementById('image-map-pro')
        ).then((elm) => {
          changeBackground(document.querySelectorAll('.imp-object'));

          //show reserved desks
          fetchReservedDesks(currDate);

          const selectEl = document.querySelector('.imp-ui-layers-select');

          selectEl.addEventListener('change', (e) => {
            let text = selectEl.options[selectEl.selectedIndex].text;
            setFloorName(text);
          });
        });
      };

      return () => {
        const stylesElements = document.querySelectorAll('.viewer-styles');
        document.getElementById('view-script').remove();
        stylesElements.forEach((el) => el.remove());
      };
    }
  }, [imageMapJSON]);

  useEffect(() => {
    if (floorName) {
      observeChangesOfChildren(document.querySelector('.imp-objects')).then(
        () => {
          changeBackground(document.querySelectorAll('.imp-object'));

          fetchReservedDesks(currDate);
        }
      );
    }
  }, [floorName]);

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
