import PropTypes from 'prop-types';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { setReceiver, setNewMessageCount } from 'redux/actions/chatroom';

/** third-party components */
import { Menu, SubMenu } from 'react-pro-sidebar';

/** components */
import { UserItem, PublicUserGroupItem } from './UserItem';

/** constants */
import { ALL, CLEAR } from 'utils/consts';

const UserList = ({ isOnline, users, userCount }) => {
  /** store vars */
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.chatroom.receiver);
  const newMessageCount = useSelector(
    (state) => state.chatroom.newMessageCount
  );

  const label = isOnline ? `ONLINE` : `OFFLINE`;

  const toggleUser = (uid) => {
    dispatch(setReceiver(uid));
    dispatch(setNewMessageCount(uid, CLEAR));
  };

  return (
    <Menu>
      <SubMenu defaultOpen={isOnline} label={`${label} (${userCount})`}>
        {isOnline ? (
          <PublicUserGroupItem
            active={ALL === receiver}
            onClick={() => toggleUser(ALL)}
            newMessageCount={newMessageCount[ALL]}
          />
        ) : null}
        {users.map((user) => (
          <UserItem
            key={user.uid}
            user={user}
            active={user.uid === receiver}
            onClick={() => toggleUser(user.uid)}
            newMessageCount={newMessageCount[user.uid]}
          />
        ))}
      </SubMenu>
    </Menu>
  );
};

UserList.propTypes = {
  isOnline: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userCount: PropTypes.number.isRequired,
};

export default UserList;
