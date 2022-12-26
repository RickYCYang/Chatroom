import PropTypes from 'prop-types';

/** third-party components */
import { MdArrowDropDownCircle } from 'react-icons/md';
import Button from 'react-bootstrap/Button';

const ScrollButton = ({ scrollToBottom, className }) => {
  return (
    <Button
      variant="light"
      className={`rounded-pill border border-secondary px-3 d-flex align-items-center text-secondary ${className}`}
      onClick={scrollToBottom}
    >
      <MdArrowDropDownCircle className="me-2" />
      SCROLL
    </Button>
  );
};

ScrollButton.propTypes = {
  scrollToBottom: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ScrollButton;
