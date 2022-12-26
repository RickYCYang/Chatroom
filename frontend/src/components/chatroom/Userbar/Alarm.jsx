import PropTypes from 'prop-types';
import { memo } from 'react';

/** third-party components */
import Badge from 'react-bootstrap/Badge';

const Alarm = memo(({ count, className }) => {
  return (
    <Badge bg="danger" pill={true} className={`${className}`}>
      {count}
    </Badge>
  );
});

Alarm.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};

export default Alarm;
