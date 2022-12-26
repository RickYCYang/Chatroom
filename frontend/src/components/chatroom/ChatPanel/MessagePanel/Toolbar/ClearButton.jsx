import PropTypes from 'prop-types';

/** third-party components */
import { MdDelete } from 'react-icons/md';
import Button from 'react-bootstrap/Button';

/** redux */
import { useDispatch } from 'react-redux';
import { clearMessages } from 'redux/actions/chatroom';

const ClearButton = ({ className }) => {
  /** store vars */
  const dispatch = useDispatch();

  const clearMessage = () => {
    dispatch(clearMessages());
  };

  return (
    <Button
      variant="light"
      className={`rounded-pill border border-secondary px-3 d-flex align-items-center text-secondary ${className}`}
      onClick={clearMessage}
    >
      <MdDelete className="me-2" />
      CLEAR
    </Button>
  );
};

ClearButton.propTypes = {
  className: PropTypes.string,
};

export default ClearButton;
