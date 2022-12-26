import { createBrowserRouter } from 'react-router-dom';

/** components of each route */
import Login from 'components/login';
import Signup from 'components/signup';
import Edit from 'components/edit';
import Chatroom from 'components/chatroom';

/** context */
import WebSocketProvider from 'context/WebSocketContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WebSocketProvider>
        <Chatroom />
      </WebSocketProvider>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/edit',
    element: (
      <WebSocketProvider>
        <Edit />
      </WebSocketProvider>
    ),
  },
]);

export default router;
