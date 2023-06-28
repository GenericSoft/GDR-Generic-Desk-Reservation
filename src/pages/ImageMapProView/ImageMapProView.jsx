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

import {
  observeChangesOfChildren,
  waitForElementToBeAppended,
} from '../../utils/waitForElementToBeAppended';

import './ImageMapPro.scss';
import HoursModal from '../../components/HoursModal/HoursModal';

const ImageMapProView = () => {
  const [deskId, setDeskId] = useState('');
  const [floorName, setFloorName] = useState('');
  const [responsiveClass, setResponsiveClass] = useState('');
  const [alreadyReservedHours, setAlreadyReservedHours] = useState('');
  const [imageMapJSON, setImageMapJSON] = useState('');
  const [infoModalShown, setInfoModalShown] = useState(false);
  const [shownImageMap, setShownImageMap] = useState('');
  const [isReservationDone, setIsReservationDone] = useState('');

  const location = useLocation();

  const userId = useAppSelector((state) => state.user.userId);

  const currDate = location.state.currDate;
  const srcFilePath = `${process.env.PUBLIC_URL}/assets/lib/imp/image-map-pro.min.js`;

  const checkIfReservationIsSaved = (isReservationDone) => {
    setIsReservationDone(isReservationDone);
  };

  const getWindowWidth = () => {
    setTimeout(() => {
      if (
        window.innerHeight < document.querySelector('.imp-image').clientHeight
      ) {
        setResponsiveClass('normal-window');
      } else {
        setResponsiveClass('');
      }
    }, 0);
  };
  const fetchReservedDesks = async (currDate) => {
    const imageMapId = getImageMapId();
    setShownImageMap(imageMapId);

    const desks = await getReservedDesksByDate(currDate, imageMapId);
    if (desks) {
      desks.data().desks.forEach((element, index) => {
        const p = [];
        const hours = [];

        element.usersArray.forEach((el) => {
          p.push(el.userId);
          if (el.timeFrom) {
            hours.push(
              '' + el.timeFrom.toDate() + '-' + el.timeTo.toDate() + ''
            );
          }

          if (el.timeFrom) {
            document
              .querySelector('[data-object-id="' + element.deskId + '"]')
              .setAttribute('hours', hours);

            document.querySelector(
              '[data-object-id="' + element.deskId + '"]'
            ).style.background = 'yellow';

            document
              .querySelector('[data-object-id="' + element.deskId + '"]')
              .setAttribute('reservedfrom', p);
          } else {
            document.querySelector(
              '[data-object-id="' + element.deskId + '"]'
            ).style.background = 'red';

            document
              .querySelector('[data-object-id="' + element.deskId + '"]')
              .setAttribute('reserved', p);
          }
        });
      });
    }
    getWindowWidth();
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
        setInfoModalShown(true);
        const id = img.getAttribute('data-object-id');
        if (
          !img.getAttribute('reserved') &&
          !img.getAttribute('reservedfrom')
        ) {
          setAlreadyReservedHours('');
          setDeskId(id);

          const attribute = img.getAttribute('data-title');

          if (attribute !== 'Text' && !img.getAttribute('reservedfrom')) {
            if (!img.style.background) {
              img.style.background = 'green';
            }

            if (img.style.background === 'green') {
              img.style.background = 'red';
            } else {
              img.style.background = 'green';
            }
          }
        } else if (img.getAttribute('reservedfrom')) {
          setDeskId(id);
          setAlreadyReservedHours(img.getAttribute('hours'));
        } else {
          alert('This desk is already reserved for the day!');
          setInfoModalShown(false);
        }
      });
    });
  };

  const closeInfoModal = () => {
    setInfoModalShown(false);
  };

  // USE EFFECTS
  useEffect(() => {
    getImageMapJSON();
    window.addEventListener('resize', getWindowWidth);
    return () => {
      window.removeEventListener('resize', getWindowWidth);
    };
  }, []);

  useEffect(() => {
    //check if reservation has been made, update the view, if not, set background back to red
    if (isReservationDone) {
      fetchReservedDesks(currDate);
    }
    if (
      document.querySelector('[data-object-id="' + deskId + '"]') &&
      (isReservationDone == 'close' || isReservationDone == 'closex') &&
      !document
        .querySelector('[data-object-id="' + deskId + '"]')
        .getAttribute('hours')
    ) {
      document.querySelector(
        '[data-object-id="' + deskId + '"]'
      ).style.background = 'green';
    }
    setIsReservationDone('');
  }, [isReservationDone]);

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
        modalClass={
          infoModalShown ? 'blurred-overlay' : 'image-map-viewer-modal'
        }
      >
        <HoursModal
          show={infoModalShown}
          close={closeInfoModal}
          shownImageMap={shownImageMap}
          currDate={currDate}
          deskId={deskId}
          reservedHours={alreadyReservedHours}
          checkIfReservationIsSaved={checkIfReservationIsSaved}
        />
        <div id="image-map-pro" className={responsiveClass}></div>
      </ModalContainer>
    </div>
  );
};

export default ImageMapProView;
