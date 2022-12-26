import PropTypes from 'prop-types';

/** third-party components */
import { MdPerson } from 'react-icons/md';

const UserIcon = ({ isOnline, size = 24, className }) => {
  const color = isOnline ? 'text-success' : 'text-secondary';
  return <MdPerson className={`me-2 ${className} ${color}`} size={size} />;
};

UserIcon.propTypes = {
  isOnline: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default UserIcon;
