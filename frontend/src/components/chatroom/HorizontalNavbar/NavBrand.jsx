/* third-party components */
import Navbar from 'react-bootstrap/Navbar';
import { MdMessage, MdMenu } from 'react-icons/md';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserbar } from 'redux/actions/chatroom';

const NavBrand = () => {
  /** store vars */
  const dispatch = useDispatch();
  const openUserbar = useSelector((state) => state.chatroom.openUserbar);

  const menuClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleUserbar(!openUserbar));
  };

  return (
    <Navbar.Brand href="/" className="d-flex align-items-center">
      <MdMenu onClick={menuClickHandler} className="me-3" />
      Chatroom
      <MdMessage className="ms-3" />
    </Navbar.Brand>
  );
};

export default NavBrand;
