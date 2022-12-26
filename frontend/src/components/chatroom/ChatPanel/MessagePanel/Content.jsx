import PropTypes from 'prop-types';

/** redux */
import { useDispatch } from 'react-redux';
import { toggleImageModal } from 'redux/actions/chatroom';

/** utils */
import { IMAGE, TEXT } from 'utils/consts';

const Content = ({ type, message }) => {
  /** store vars */
  const dispatch = useDispatch();

  switch (type) {
    case TEXT:
      return <p className="mb-0">{message}</p>;
    case IMAGE:
      return (
        <img
          src={message}
          style={{ cursor: 'pointer' }}
          className="mw-100 h-auto cursor-pointer p-2"
          alt="message"
          onClick={() => dispatch(toggleImageModal(true, message))}
        />
      );
    default:
      return message;
  }
};

Content.propTypes = {
  type: PropTypes.oneOf([IMAGE, TEXT]).isRequired,
  message: PropTypes.string.isRequired,
};

export default Content;
