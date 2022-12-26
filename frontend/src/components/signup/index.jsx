import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* redux */
import { useSelector, useDispatch } from 'react-redux';
import { signup } from 'redux/actions/user';

/** components */
import Error from '../Error';

/* third-party components */
import { Card, Form, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { MdSave, MdArrowBack } from 'react-icons/md';

/** assets */
import chatImg from 'assets/image/chat.png';

/** utils */
import { emailRegex } from 'utils/regex';

const Signup = () => {
  /** local vars */
  const navigate = useNavigate();

  /** store vars */
  const dispatch = useDispatch();
  const { signUpStatus, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (signUpStatus === 'success') {
      navigate('/login');
    }
  }, [signUpStatus, navigate]);

  const validator = (values) => {
    const errors = {};
    /** email */
    if (!values.email) {
      errors.email = 'Required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    /** password */
    if (!values.password) {
      errors.password = 'Required';
    }

    /** confirm password */
    if (!values.confirmedPassword) {
      errors.confirmedPassword = 'Required';
    } else if (values.confirmedPassword !== values.password) {
      errors.confirmedPassword = 'Password not aligned';
    }

    /** nickname */
    if (!values.nickname) {
      errors.nickname = 'Required';
    }

    return errors;
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const { email, password, nickname } = values;
    await dispatch(signup(email, password, nickname));
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <Card className="p-5">
        <Card.Title className="d-flex flex-row justify-content-center align-items-center pb-2 mb-2 border-bottom border-primary">
          <h1 className="mb-0 fw-bold text-primary">Signup+</h1>
        </Card.Title>
        <Card.Body>
          <img
            src={chatImg}
            alt="chatroom"
            className="w-100 h-200 m-auto rounded mb-2"
          />
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmedPassword: '',
              nickname: '',
            }}
            validate={validator}
            onSubmit={submitHandler}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="my-2"
                />
                {errors.email && touched.email && (
                  <Error message={errors.email} />
                )}
                <Form.Control
                  required
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="my-2"
                />
                {errors.password && touched.password && (
                  <Error message={errors.password} />
                )}
                <Form.Control
                  required
                  type="password"
                  id="confirmedPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmedPassword}
                  className="my-2"
                />
                {errors.confirmedPassword && touched.confirmedPassword && (
                  <Error message={errors.confirmedPassword} />
                )}
                <Form.Control
                  required
                  type="text"
                  placeholder="Nickname"
                  id="nickname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nickname}
                  className="my-2"
                />
                {errors.nickname && touched.nickname && (
                  <Error message={errors.nickname} />
                )}
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mx-2 px-3 d-flex align-items-center"
                  >
                    <MdSave className="me-1" />
                    SIGNUP
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/login')}
                    className="mx-2 px-3 d-flex align-items-center"
                  >
                    <MdArrowBack className="me-1" />
                    BACK
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {signUpStatus === 'error' && (
            <Alert variant="danger" className="mt-4">
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
