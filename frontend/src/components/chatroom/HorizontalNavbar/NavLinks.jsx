import { useContext } from 'react';

/** redux */
import { useDispatch } from 'react-redux';
import { logout } from 'redux/actions/user';
import { useNavigate } from 'react-router-dom';

/** context */
import { WebSocketContext } from 'context/WebSocketContext';

/* third-party components */
import Nav from 'react-bootstrap/Nav';
import { MdLogout, MdPerson } from 'react-icons/md';

const NavLinks = () => {
  const navigate = useNavigate();
  /** store vars */
  const dispatch = useDispatch();
  /** context vars */
  const ws = useContext(WebSocketContext);

  const signoutHandler = () => {
    dispatch(logout());
    ws.disconnect();
  };

  return (
    <Nav className="justify-content-end">
      <Nav.Link
        onClick={() => navigate('/edit')}
        className="d-none d-sm-flex align-items-center "
      >
        <MdPerson className="me-2" />
        Edit
      </Nav.Link>
      <Nav.Link className="d-flex align-items-center" onClick={signoutHandler}>
        <MdLogout className="me-2" />
        Sign out
      </Nav.Link>
    </Nav>
  );
};

export default NavLinks;
