import { db } from '../../firebase';
import {
  doc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { toError } from '../../utils/error';

export const saveImageToFirebaseRequest = async (imageMapJSON: string) => {
  try {
    const imageMapId = JSON.parse(imageMapJSON)[0].id;

    const doesItExists = await checkIfDocumentExists(imageMapId);

    const docRef = doc(db, 'imageMap', imageMapId);
    if (doesItExists) {
      await updateDoc(docRef, {
        imageJSON: imageMapJSON,
      });

      return imageMapJSON;
    } else {
      await setDoc(docRef, {
        imageJSON: imageMapJSON,
        nameRoom: '',
        reservedDesks: [],
      });
    }
  } catch (error) {
    throw toError(error);
  }
};

export const getImageMapJSONRequest = async (imageMapId: string) => {
  const docRef = doc(db, 'imageMap', imageMapId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const imageMap = docSnap.data();

    console.log('imageMap', imageMap);

    return imageMap.imageJSON;
  }
};

export const checkIfDocumentExists = async (imageId: string) => {
  const colRef = collection(db, 'imageMap');
  const docsSnap = await getDocs(colRef);

  docsSnap.forEach((doc) => {
    if (imageId === doc.id) {
      return true;
    }
  });

  return false;
};

export const getImageMapIdRequest = async () => {
  const colRef = collection(db, 'imageMap');
  const docsSnap = await getDocs(colRef);

  let imageMapId = '';

  docsSnap.forEach((doc) => {
    imageMapId = doc.id;
  });

  if (imageMapId) {
    return imageMapId;
  } else {
    return;
  }
};
