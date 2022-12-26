import PropTypes from 'prop-types';

/** components */
import { MdPerson } from 'react-icons/md';

const User = ({ nickname }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-4">
      <MdPerson size={32} className="text-primary" />
      {nickname}
    </div>
  );
};

User.propTypes = {
  nickname: PropTypes.string.isRequired,
};

export default User;
