/* third-party components */
import Modal from 'react-bootstrap/Modal';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { toggleImageModal } from 'redux/actions/chatroom';

const ImageModal = () => {
  /** store vars */
  const { open, imageUrl } = useSelector((state) => state.chatroom.imageModal);
  const dispatch = useDispatch();

  return (
    <Modal
      show={open}
      onHide={() => dispatch(toggleImageModal(false))}
      animation={true}
      size="lg"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <img src={imageUrl} alt="message" className="mw-100 h-auto" />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
