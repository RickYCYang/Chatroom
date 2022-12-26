import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** components */
import NavBrand from './NavBrand';
import NavLinks from './NavLinks';

/** redux */
import { useSelector } from 'react-redux';

/* third-party components */
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const HorizontalNavbar = () => {
  const navigate = useNavigate();

  /** store vars */
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    if (!uid) {
      navigate('/login');
    }
  }, [uid, navigate]);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavBrand />
        <NavLinks />
      </Container>
    </Navbar>
  );
};

export default HorizontalNavbar;
