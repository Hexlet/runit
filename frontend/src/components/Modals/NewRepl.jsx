import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object } from 'yup';

import { useSnippets } from '../../hooks';

import { actions as modalActions } from '../../slices/modalSlice.js';
import { replName } from '../../utils/validationSchemas';

function NewRepl() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const snippetsApi = useSnippets();
  const navigate = useNavigate();
  const { code, currentLanguage, userInfo, modalItem } = useSelector(
    ({ editor, languages, user, modal }) => ({
      code: editor.code,
      currentLanguage: languages.currentLanguage,
      userInfo: user.userInfo,
      modalItem: modal.item,
    }),
  );
  const [suggestedSnippetname, setSuggestedSnippetname] = useState('');
  const languages = new Map()
    .set('javascript', '.js')
    .set('python', '.py')
    .set('php', '.php');

  useEffect(() => {
    inputRef.current.focus();
  });

  const validationSchema = object({
    name: replName(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        const name = `${values.name}${languages.get(currentLanguage)}`;
        const id = await snippetsApi.saveSnippet(code, name);
        const { slug } = await snippetsApi.getSnippetData(id);
        const link = snippetsApi.genViewSnippetLink(userInfo.login, slug);
        const url = new URL(link);
        navigate(url.pathname);

        dispatch(modalActions.closeModal());
        actions.setSubmitting(false);
      } catch (err) {
        actions.setSubmitting(false);
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        } else {
          console.log(t('errors.network'));
          throw err;
        }
      }
    },
  });

  useEffect(() => {
    const setSnippetName = async () => {
      try {
        const snippetName = await snippetsApi.getDefaultSnippetName();
        setSuggestedSnippetname(snippetName);
      } catch (error) {
        console.error(error);
      }
    };

    setSnippetName();
  }, []);

  useEffect(() => {
    // user hasn't type any name yet
    if (!formik.values.name) {
      formik.setFieldValue('name', suggestedSnippetname);
    }
  }, [suggestedSnippetname]);

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      show
    >
      <Modal.Header
        className="bg-dark text-white border-secondary"
        closeButton
        closeVariant="white"
      >
        <Modal.Title>
          {modalItem ? modalItem.header : t('modals.newSnippetName')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="name"
              label={t('modals.share.snippetNameLabel')}
              className="text-white"
            >
              <Form.Control
                className="text-white bg-dark border-secondary"
                name="name"
                onChange={formik.handleChange}
                placeholder={t('modals.share.snippetNameLabel')}
                ref={inputRef}
                value={formik.values.name}
                isInvalid={formik.touched.name && t(formik.errors.name)}
              />

              <Form.Control.Feedback type="invalid">
                {formik.touched.name && t(formik.errors.name)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div
            className="d-flex mt-4 justify-content-end"
            style={{ columnGap: '12px' }}
          >
            <Button
              variant="danger"
              onClick={() => dispatch(modalActions.closeModal())}
              type="button"
              style={{ width: 'calc(20% - 10px)' }}
            >
              {t('modals.cancelButton')}
            </Button>
            <div className="gap" style={{ marginLeft: 'auto' }} />
            <Button
              variant="success"
              disabled={formik.isSubmitting}
              type="submit"
              style={{ width: 'calc(35% - 10px)' }}
            >
              {t('modals.share.saveSnippetButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewRepl;
