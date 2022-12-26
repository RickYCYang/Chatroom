import { useEffect } from 'react';

/** redux */
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserbar } from 'redux/actions/chatroom';

/** third-party components */
import { Sidebar } from 'react-pro-sidebar';

/** hooks */
import useWindowSize from 'hooks/useWindowSize';

/** components */
import UserList from './UserList';
import User from './User';

const Userbar = () => {
  /** store vars */
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const nickname = useSelector((state) => state.user.nickname);
  const users = useSelector((state) => Object.values(state.chatroom.users));
  const openUserbar = useSelector((state) => state.chatroom.openUserbar);

  const { width } = useWindowSize();
  const onlineUsers = users.filter((user) => user.isOnline && user.uid !== uid);
  const offlineUsers = users.filter((user) => !user.isOnline);

  useEffect(() => {
    if (width < 576) {
      dispatch(toggleUserbar(false));
    } else {
      dispatch(toggleUserbar(true));
    }
  }, [dispatch, width]);

  return (
    <Sidebar defaultCollapsed={!openUserbar} collapsedWidth={0}>
      <User nickname={nickname} />
      <UserList
        users={onlineUsers}
        userCount={onlineUsers.length + 1}
        isOnline
      />
      <UserList users={offlineUsers} userCount={offlineUsers.length} />
    </Sidebar>
  );
};

export default Userbar;
