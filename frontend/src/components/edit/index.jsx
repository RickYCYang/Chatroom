import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* redux */
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, clearEditStatus } from 'redux/actions/user';

/** components */
import Error from '../Error';

/* third-party components */
import { Card, Form, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { MdSave, MdArrowBack } from 'react-icons/md';

/** assets */
import chatImg from 'assets/image/chat.png';

const Edit = () => {
  /** local vars */
  const navigate = useNavigate();

  /** store vars */
  const dispatch = useDispatch();
  const { editStatus, message, nickname } = useSelector((state) => state.user);

  useEffect(() => {
    if (editStatus === 'success') {
      dispatch(clearEditStatus());
      navigate('/');
    }
  }, [editStatus, navigate, dispatch]);

  const validator = (values) => {
    const errors = {};
    /** nickname */
    if (!values.nickname) {
      errors.nickname = 'Required';
    }

    if (values.nickname === nickname) {
      errors.nickname = 'Change a new nickname';
    }

    return errors;
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const { nickname } = values;
    await dispatch(updateUser(nickname));
  };

  return (
    <div
      className="d-flex justify-content-center py-5"
      style={{ minWidth: '50%' }}
    >
      <Card className="p-5">
        <Card.Title className="d-flex flex-row justify-content-center align-items-center pb-2 mb-2 border-bottom border-primary">
          <h1 className="mb-0 fw-bold text-primary">Edit</h1>
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
              nickname,
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
                <p>Update new nickname</p>
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
                    SAVE
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/')}
                    className="mx-2 px-3 d-flex align-items-center"
                  >
                    <MdArrowBack className="me-1" />
                    BACK
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {editStatus === 'error' && (
            <Alert variant="danger" className="mt-4">
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Edit;
