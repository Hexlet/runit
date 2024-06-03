import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import routes from '../../routes';
import { actions } from '../../slices';
import SignInForm from '../Forms/SignInForm';

function SignInModal({ handleClose, isOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    handleClose();
    navigate(routes.myProfilePagePath());
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title className="display-6">
          {t('signIn.pageHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignInForm onSuccess={handleSuccess} />
        <div className="d-flex justify-content-center align-items-baseline mt-5">
          <span className="text-body-secondary">
            {t('signIn.footer.signUpHeader')}
          </span>{' '}
          <Button
            onClick={() => dispatch(actions.openModal({ type: 'signingUp' }))}
            variant="link"
          >
            {t('signIn.footer.signUpAction')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignInModal;
