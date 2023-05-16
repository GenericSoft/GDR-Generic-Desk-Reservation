import { FirebaseError } from 'firebase/app';

export function toError(originalError: unknown, isFirebaseError?: boolean) {
  if (originalError instanceof Error) {
    if (isFirebaseError) {
      const firebaseError = originalError as FirebaseError;
      return new Error(firebaseError.code);
    }
    return new Error(originalError.message);
  }

  return new Error(String(originalError));
}
