import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
  isShowModal: boolean;
  confirmDeleteImage: () => void;
  modalForDeleadImage: (prop: boolean) => void;
  title: string;
  description: string;
};

const ModalComponent = (props: Props) => {
  return (
    <Modal
      show={props.isShowModal}
      onHide={() => props.modalForDeleadImage(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.description}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => props.modalForDeleadImage(false)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={props.confirmDeleteImage}>
          Yes, I am sure
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalComponent;
