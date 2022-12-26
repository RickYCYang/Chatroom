import PropTypes from 'prop-types';

/** third-party components */
import { MenuItem } from 'react-pro-sidebar';
import { MdPeople } from 'react-icons/md';

/** components */
import UserIcon from './UserIcon';
import Alarm from './Alarm';

/** constants */
import { ALL } from 'utils/consts';

const UserItem = ({ user, active, newMessageCount, onClick }) => {
  return (
    <MenuItem
      key={user.uid}
      disabled={!user.isOnline}
      active={active}
      onClick={() => onClick(user.uid)}
    >
      <span className="d-flex align-items-center w-100 px-2">
        <UserIcon isOnline={user.isOnline} size={24} className="me-2 " />
        {user.nickname}
        {newMessageCount > 0 ? (
          <Alarm count={newMessageCount} className="ms-3" />
        ) : null}
      </span>
    </MenuItem>
  );
};

const PublicUserGroupItem = ({ active, newMessageCount, onClick }) => {
  return (
    <MenuItem active={active} onClick={() => onClick(ALL)}>
      <span className="d-flex align-items-center w-100 px-2">
        <MdPeople size={24} className="me-2 text-success" />
        ALL
        {newMessageCount > 0 ? (
          <Alarm count={newMessageCount} className="ms-3" />
        ) : null}
      </span>
    </MenuItem>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  newMessageCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

PublicUserGroupItem.propTypes = {
  active: PropTypes.bool.isRequired,
  newMessageCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export { UserItem, PublicUserGroupItem };
