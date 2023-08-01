import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { actions as userActions } from '../../slices/userSlice.js';
import routes from '../../routes';
import { email, username } from '../../utils/validationSchemas';
import FormAlert from './FormAlert.jsx';

function UpdateAccountForm() {
  const { t } = useTranslation();
  const emailRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const validationSchema = object().shape({
    username: username(),
    email: email(),
  });

  const initialValues = {
    username: userInfo.login,
    email: userInfo.email,
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      setFormState(initialFormState);
      try {
        const response = await axios.put(routes.updateUserPath(userInfo.id), {
          id: userInfo.id,
          login: values.username,
          email: values.email,
        });
        dispatch(userActions.setUserInfo(response.data));
        setFormState({
          state: 'success',
          message: 'profileSettings.updateSuccessful',
        });
      } catch (err) {
        formik.resetForm();
        if (!err.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        }
        if (
          err.response?.status === 400 &&
          Array.isArray(err.response?.data?.errs?.message)
        ) {
          err.response.data.errs.message.forEach((e) => {
            switch (e) {
              case 'loginIsUsed':
                actions.setFieldError(
                  'username',
                  'errors.validation.usernameIsUsed',
                );
                usernameRef.current.select();
                break;
              case 'emailIsUsed':
                actions.setFieldError('email', 'errors.validation.emailIsUsed');
                emailRef.current.select();
                break;
              default:
                setFormState({
                  state: 'failed',
                  message: 'profileSettings.updateFailed',
                });
                throw err;
            }
          });
        } else {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
          throw err;
        }
      }
    },
  });

  return (
    <Form
      className="d-flex flex-column gap-3"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <h5>{t('profileSettings.updateAccount')}</h5>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form.Group controlId="username">
        <Form.Label>{t('profileSettings.usernameLabel')}</Form.Label>
        <Form.Control
          ref={usernameRef}
          autoComplete="username"
          isInvalid={formik.touched.username && formik.errors.username}
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type="text"
          value={formik.values.username}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>{t('profileSettings.emailLabel')}</Form.Label>
        <Form.Control
          ref={emailRef}
          autoComplete="email"
          isInvalid={formik.touched.email && formik.errors.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type="email"
          value={formik.values.email}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.email)}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        className="ms-auto"
        disabled={!formik.dirty || formik.isSubmitting}
        type="submit"
        variant="primary"
      >
        {t('profileSettings.updateButton')}
      </Button>
    </Form>
  );
}

export default UpdateAccountForm;
