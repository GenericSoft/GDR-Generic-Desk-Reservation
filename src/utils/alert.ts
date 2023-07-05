import Swal, { SweetAlertIcon } from 'sweetalert2';

type optionsType = {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  confirmTitle?: string;
  confirmText?: string;
  executeAfterConfirmFunction?: () => void;
};

export const fireAlert = async (type: string, options: optionsType) => {
  const {
    title,
    text,
    confirmButtonText,
    confirmTitle,
    confirmText,
    executeAfterConfirmFunction,
  } = options;

  if (type === 'confirm') {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c9b9',
      cancelButtonColor: '#cf153a',
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        executeAfterConfirmFunction && executeAfterConfirmFunction();
        Swal.fire(confirmTitle, confirmText, 'success');
      }
    });
  } else if (type === 'alert') {
    return Swal.fire({
      title,
      text,
    });
  } else {
    // if type is error, warning or success
    return Swal.fire({
      icon: type as SweetAlertIcon,
      title,
      text,
    });
  }
};
