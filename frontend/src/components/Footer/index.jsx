import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Youtube, Telegram, Twitter } from 'react-bootstrap-icons';
import { ReactComponent as Vk } from '../../assets/images/icons/vk.svg';
import classes from './index.module.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark border-top border-secondary pt-4 pb-5">
      <Container>
        <Row className="gy-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row pt-3">
          <Col>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  eventKey="about"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  href="https://ru.hexlet.io/pages/about"
                  target="_blank"
                >
                  {t('footer.about')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="career"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://hexlet-ru.notion.site/c6406ed8890747e690d32b050faf42c2"
                  target="_blank"
                >
                  {t('footer.career')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="shop"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://hexlet.printdirect.ru/?partner_id=615497"
                  target="_blank"
                >
                  {t('footer.shop')}
                </Nav.Link>
                <Nav.Link
                  as="a"
                  eventKey="support_email"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="mailto: runit@hexlet.io"
                  target="_blank"
                >
                  {t('footer.mailSupport')}
                </Nav.Link>
              </li>
            </Nav>
            <Nav as="ul" className="flex-column align-items-start mt-3">
              <li>
                <span className="lead fw-normal">
                  <a
                    href={t('footer.tel1Href')}
                    className={`${classes.footerLink} text-decoration-none`}
                  >
                    {t('footer.tel1')}
                  </a>
                </span>
                <span className="text-muted">{t('footer.rf')}</span>
              </li>
              <li>
                <span className="lead fw-normal">
                  <a
                    href={t('footer.tel2Href')}
                    className={`${classes.footerLink} text-decoration-none`}
                  >
                    {t('footer.tel2')}
                  </a>
                </span>
                <span className="text-muted">{t('footer.moscow')}</span>
              </li>
            </Nav>
            <p className="mt-3 text-muted">
              <span className="d-block">{t('footer.name')}</span>
              <span className="d-block">{t('footer.city')}</span>
              <span className="d-block">{t('footer.street')}</span>
              <span className="d-block">{t('footer.ogrn')}</span>
            </p>
          </Col>
          <Col>
            <div className="fw-bold mt-3 mb-2 text-white">
              {t('footer.doc')}
            </div>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  eventKey="conditions"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  href="https://ru.hexlet.io/pages/tos"
                  target="_blank"
                >
                  {t('footer.conditions')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="agreement"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://ru.hexlet.io/pages/personal_data"
                  target="_blank"
                >
                  {t('footer.agreement')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as={Link}
                  eventKey="licenseAgreement"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  to="/licenseAgreement"
                >
                  {t('footer.licenseAgreement')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="source"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://github.com/hexlet-rus/runit"
                  target="_blank"
                >
                  {t('footer.source')}
                </Nav.Link>
              </li>
            </Nav>
            <Nav as="ul" className="flex-column align-items-start">
              <div className="fw-bold mt-3 mb-3 text-white">
                {t('footer.subscribe')}
              </div>
              <ul className="list-unstyled h3 text-start d-flex flex-wrap">
                <li className="me-4 mb-2">
                  <a
                    href="https://t.me/hexletcommunity/12"
                    aria-label="Telegram"
                    target="_blank"
                    className={`${classes.footerLink}`}
                    rel="noopener noreferrer nofollow"
                  >
                    <Telegram />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    href="https://www.youtube.com/user/HexletUniversity"
                    aria-label="Youtube"
                    target="_blank"
                    className={`${classes.footerLink}`}
                    rel="noopener noreferrer nofollow"
                  >
                    <Youtube />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    href="https://t.me/hexlet_ru"
                    aria-label="Telegram"
                    target="_blank"
                    className={`${classes.footerLink}`}
                    rel="noopener noreferrer nofollow"
                  >
                    <Telegram />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    href="https://vk.com/hexlet"
                    aria-label="Vk"
                    target="_blank"
                    className={`${classes.footerLink}`}
                    rel="noopener noreferrer nofollow"
                  >
                    <Vk />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    href="https://twitter.com/HexletHQ"
                    aria-label="Twitter"
                    target="_blank"
                    className={`${classes.footerLink}`}
                    rel="noopener noreferrer nofollow"
                  >
                    <Twitter />
                  </a>
                </li>
              </ul>
            </Nav>
            {/* Add it when english version will be available
              <Dropdown role="group" className="mt-3">
                <Dropdown.Toggle
                  className="btn-link text-body text-decoration-none p-0 x-btn-focus-visible"
                  split
                  variant="none"
                >
                  <Globe /> // from react-bootstrap-icons
                  <span className="fw-bold me-2">{t('footer.language')}</span>
                </Dropdown.Toggle>
  
                <Dropdown.Menu as="ul">
                  <li>
                    <Dropdown.Item as="a" className="dropdown-item" href="/#">
                      <img
                        width="22"
                        alt="Переключить язык на en"
                        className="my-auto me-2"
                        loading="lazy"
                        src="https://cdn2.hexlet.io/assets/flag-en-f0b48c6562bb27879fbd685ece0133271ea043384dd9793843c246f862ac7cc1.svg"
                      />
                      <span className="my-auto text-muted">{t('footer.en')}</span>
                    </Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item as="a" className="dropdown-item" href="/#">
                      <img
                        width="22"
                        alt="Переключить язык на ru"
                        className="my-auto me-2"
                        loading="lazy"
                        src="https://cdn2.hexlet.io/assets/flag-ru-593864ce87ae202b2c2e9393b2a6cf9384ac9cbb1c70632f4c6eeca34341483e.svg"
                      />
                      <span className="my-auto text-muted">{t('footer.ru')}</span>
                    </Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown> */}
          </Col>
          <Col>
            <div className="fw-bold mt-3 mb-2 text-white">
              {t('footer.project')}
            </div>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  eventKey="hexlet"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  href="https://ru.hexlet.io/my"
                  target="_blank"
                >
                  {t('footer.hexlet')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="college"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://hexly.ru/"
                  target="_blank"
                >
                  {t('footer.college')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="codeBasics"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://code-basics.com/ru?roistat_visit=4835603"
                  target="_blank"
                >
                  {t('footer.codeBasics')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="codeBattle"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://codebattle.hexlet.io/?_gl=1*1borq0u*_ga*NjQ3OTI4OTc2Mi4xNjU5MDk4NTgy*_ga_PM3R85EKHN*MTY2ODA5OTEzOS4xOTEuMS4xNjY4MDk5NjIwLjAuMC4w#lobby"
                  target="_blank"
                >
                  {t('footer.codeBattle')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="guides"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://guides.hexlet.io/ru/?roistat_visit=4835603&_gl=1*1borq0u*_ga*NjQ3OTI4OTc2Mi4xNjU5MDk4NTgy*_ga_PM3R85EKHN*MTY2ODA5OTEzOS4xOTEuMS4xNjY4MDk5NjIwLjAuMC4w"
                  target="_blank"
                >
                  {t('footer.guides')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  eventKey="cv"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  href="https://cv.hexlet.io/?_gl=1*1borq0u*_ga*NjQ3OTI4OTc2Mi4xNjU5MDk4NTgy*_ga_PM3R85EKHN*MTY2ODA5OTEzOS4xOTEuMS4xNjY4MDk5NjIwLjAuMC4w"
                  target="_blank"
                >
                  {t('footer.cv')}
                </Nav.Link>
              </li>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
