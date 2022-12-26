import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* redux */
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/user';

/** components */
import Error from '../Error';

/* third-party components */
import { Card, Form, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { MdOutlineLogin, MdPersonAddAlt1 } from 'react-icons/md';

/** assets */
import chatImg from 'assets/image/chat.png';

/** utils */
import { emailRegex } from 'utils/regex';

const Login = () => {
  const navigate = useNavigate();

  /** store vars */
  const dispatch = useDispatch();
  const { loginStatus, message, uid } = useSelector((state) => state.user);

  useEffect(() => {
    if (uid) {
      navigate('/');
    }
  }, [uid, navigate]);

  const validator = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  return (
    <div className="d-flex justify-content-center py-5 h-100">
      <Card className="p-5">
        <Card.Title className="d-flex flex-row justify-content-center align-items-center pb-2 mb-2 border-bottom border-primary">
          <h1 className="mb-0 fw-bold text-primary">Login</h1>
        </Card.Title>
        <Card.Body>
          <img
            src={chatImg}
            alt="chatroom"
            className="w-100 h-200 m-auto rounded mb-2"
          />
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={validator}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              dispatch(login(values.email, values.password));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  required
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="my-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Error message={errors.email} />
                )}
                <Form.Control
                  required
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="my-2"
                />

                {errors.password && touched.password && (
                  <Error message={errors.email} />
                )}
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mx-2 px-3 d-flex align-items-center"
                  >
                    <MdOutlineLogin className="me-1" />
                    LOGIN
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/signup')}
                    className="mx-2 px-3 d-flex align-items-center"
                  >
                    <MdPersonAddAlt1 className="me-1" />
                    SIGNUP
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {loginStatus === 'error' && (
            <Alert variant="danger" className="mt-4">
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
