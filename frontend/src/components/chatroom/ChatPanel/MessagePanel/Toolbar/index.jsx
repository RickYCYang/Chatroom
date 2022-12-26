import PropTypes from 'prop-types';

/** components */
import ClearButton from './ClearButton';
import ScrollButton from './ScrollButton';

const Toolbar = ({ scrollToBottom }) => {
  return (
    <div className="position-fixed start-50 d-none d-sm-flex">
      <ClearButton className="m-2" />
      <ScrollButton scrollToBottom={scrollToBottom} className="m-2" />
    </div>
  );
};

Toolbar.propTypes = {
  scrollToBottom: PropTypes.func.isRequired,
};

export default Toolbar;
