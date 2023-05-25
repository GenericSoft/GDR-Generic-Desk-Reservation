import { db } from '../../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { toError } from '../../utils/error';

export const saveImageToFirebaseRequest = async (
  imageMapJSON: string | undefined
) => {
  try {
    const imageMapId = await getImageMapIdRequest();

    if (imageMapId) {
      const docRef = doc(db, 'imageMap', imageMapId);

      await updateDoc(docRef, {
        imageJSON: imageMapJSON,
      });

      return imageMapJSON;
    } else {
      return;
    }
  } catch (error) {
    throw toError(error);
  }
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
