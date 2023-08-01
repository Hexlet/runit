import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object } from 'yup';

import {
  BoxArrowUp,
  PencilFill,
  Share,
  ThreeDotsVertical,
  Trash3,
} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import { useSnippets } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as snippetsActions } from '../../slices/snippetsSlice.js';
import { snippetName } from '../../utils/validationSchemas';

import JavaScriptIcon from '../../assets/images/icons/javascript.svg';
import SnippetCardWrapper from './SnippetCardWrapper.jsx';

function CardHeader({ data, isRenaming, handleRename, handleCancel }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const { name, id, code } = data;

  useEffect(() => {
    const filenameInput = inputRef.current;
    if (isRenaming && filenameInput) {
      filenameInput.setSelectionRange(0, filenameInput.value.lastIndexOf('.'));
      filenameInput.focus();
    }
  }, [isRenaming, inputRef]);

  const validationSchema = object({
    name: snippetName(),
  });

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await snippetApi.renameSnippet(id, { code, name: values.name });
        dispatch(snippetsActions.updateSnippet({ id, name: values.name }));
        formik.resetForm({ values });
      } catch (error) {
        formik.resetForm();
        if (!error.isAxiosError) {
          console.log(t('errors.unknown'));
          throw error;
        } else {
          console.log(t('errors.network'));
          throw error;
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formik.isValid && formik.dirty) {
      formik.handleSubmit();
    } else {
      formik.resetForm();
    }
    handleCancel();
  };

  return (
    <div className="snippet-card-header">
      <Image
        alt="JavaScript"
        className="snippet-card-header-icon"
        src={JavaScriptIcon}
      />
      <Form className="flex-fill" onSubmit={handleSubmit}>
        {formik.isSubmitting ? null : (
          <Form.Control
            ref={inputRef}
            autoComplete="off"
            className="transition-padding"
            id="name"
            isInvalid={!!formik.errors.name}
            maxLength={30}
            name="name"
            onBlur={handleSubmit}
            onChange={formik.handleChange}
            plaintext={!isRenaming}
            readOnly={!isRenaming}
            value={formik.values.name}
          />
        )}
      </Form>
      {isRenaming ? null : (
        <Button
          className="btn-icon-only z-2"
          onClick={handleRename}
          size="sm"
          variant="nofill-secondary"
        >
          <PencilFill className="bi" />
          <span className="visually-hidden">{t('snippetActions.rename')}</span>
        </Button>
      )}
    </div>
  );
}

function CardCode({ data, noLink = false }) {
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const { code, slug } = data;
  const snippetCreatorUsername = data.user.login;

  return (
    <div className="snippet-card-body">
      <pre>{code}</pre>
      {noLink ? null : (
        <Link
          className="stretched-link"
          to={snippetApi.genViewSnippetLink(snippetCreatorUsername, slug)}
        >
          <span className="visually-hidden">{t('snippetActions.open')}</span>
        </Link>
      )}
    </div>
  );
}

const ViewMode = CardCode;

function RenameMode({ data }) {
  return <CardCode data={data} noLink />;
}

function DeleteMode({ data, handleCancel }) {
  const { id } = data;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const snippetApi = useSnippets();

  const handleSnippetDelete = async (snippetId) => {
    try {
      await snippetApi.deleteSnippet(snippetId);
      dispatch(snippetsActions.deleteSnippet(snippetId));
    } catch (error) {
      if (!error.isAxiosError) {
        console.log(t('errors.unknown'));
        throw error;
      } else {
        console.log(t('errors.network'));
        throw error;
      }
    }
  };

  return (
    <div className="snippet-card-body">
      <div className="d-flex flex-column justify-content-end h-100">
        <p className="text-center">{t('snippetActions.deleteConfirmation')}</p>
        <div className="d-flex flex-row flex-nowrap align-items-center gap-3 px-2">
          <Button
            className="w-100"
            onClick={handleCancel}
            type="button"
            variant="secondary"
          >
            {t('snippetActions.cancelButton')}
          </Button>
          <Button
            className="w-100"
            onClick={() => handleSnippetDelete(id)}
            type="button"
            variant="danger"
          >
            {t('snippetActions.delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}

function CardFooter({ handleDelete, handleShare, handleDuplicate }) {
  const [isOpened, setOpened] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="snippet-card-footer">
      <div className="toolbar z-1 w-100">
        <div
          className={`toolbar animated flex-grow-1 ${
            isOpened ? 'opened' : 'collapsed'
          }`}
        >
          <Button
            className="btn-icon-only me-auto"
            onClick={handleDelete}
            variant="nofill-danger"
          >
            <Trash3 className="bi" />
            <span className="visually-hidden">
              {t('snippetActions.delete')}
            </span>
          </Button>
          <Button
            className="btn-icon-only ms-auto"
            onClick={handleDuplicate}
            variant="nofill-secondary"
          >
            <div className="text-nowrap">
              <Share className="bi me-1" />
              <small>{t('snippetActions.duplicate')}</small>
            </div>
          </Button>
        </div>
        <Button
          aria-controls="additional-actions"
          aria-expanded={isOpened}
          className="btn-icon-only align-self-center"
          onClick={() => setOpened(!isOpened)}
          size="sm"
          variant="nofill-secondary"
        >
          <ThreeDotsVertical className="bi" />
          <span className="visually-hidden">
            {t('snippetActions.additionalHeader')}
          </span>
        </Button>

        <Button
          className="btn-icon-only"
          onClick={handleShare}
          variant="nofill-secondary"
        >
          <BoxArrowUp className="bi" />
          <span className="visually-hidden">{t('snippetActions.share')}</span>
        </Button>
      </div>
    </div>
  );
}

function SnippetCard({ data }) {
  const { id, name, slug } = data;
  const ownerUsername = data.user.login;
  const dispatch = useDispatch();
  const [mode, setMode] = useState('viewing');

  const handleRename = () => setMode('renaming');

  const handleDelete = () => setMode('deleting');

  const handleView = () => setMode('viewing');

  const handleDuplicate = () => {
    dispatch(modalActions.openModal({ type: 'inDevelopment' }));
  };

  const cardModes = new Map()
    .set('viewing', ViewMode)
    .set('renaming', RenameMode)
    .set('deleting', DeleteMode);

  const handleShare = () => {
    const item = {
      name,
      id,
      ownerUsername,
      slug,
    };
    dispatch(
      modalActions.openModal({
        type: 'sharingSnippet',
        item,
      }),
    );
  };

  const CardBody = cardModes.get(mode);

  return (
    <SnippetCardWrapper>
      <div className="snippet-card h-100">
        <CardHeader
          data={data}
          handleCancel={handleView}
          handleRename={handleRename}
          isRenaming={mode === 'renaming'}
        />

        <CardBody data={data} handleCancel={handleView} />

        {mode === 'viewing' ? (
          <CardFooter
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            handleShare={handleShare}
          />
        ) : null}
      </div>
    </SnippetCardWrapper>
  );
}

export default SnippetCard;
