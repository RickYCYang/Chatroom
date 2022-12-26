import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** redux */
import { useSelector } from 'react-redux';

/** hooks */
import useDeviceDetect from 'hooks/useDeviceDetect';

/** components */
import HorizontalNavbar from './HorizontalNavbar';
import Userbar from './Userbar';
import ChatPanel from './ChatPanel';

/** third-party components */
import { ProSidebarProvider } from 'react-pro-sidebar';

const Chatroom = () => {
  const navigate = useNavigate();

  /** store vars */
  const { uid } = useSelector((state) => state.user);
  const { isMobile } = useDeviceDetect();

  // Check if is logined
  useEffect(() => {
    if (!uid) navigate('/login');
  }, [navigate, uid]);

  useEffect(() => {
    /** window.Notification is not available in tablet and phone */
    if (isMobile) return;

    if (window.Notification && Notification.permission !== 'granted')
      Notification.requestPermission((_status) => {});
  }, [isMobile]);

  if (!uid) return null;

  return (
    <ProSidebarProvider>
      <div className="d-flex flex-column min-vh-100">
        <HorizontalNavbar />
        <div className="d-flex flex-grow-1 ">
          <Userbar />
          <ChatPanel />
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default Chatroom;
