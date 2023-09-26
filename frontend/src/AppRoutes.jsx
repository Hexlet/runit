/* eslint-disable react/jsx-sort-props */
import { Suspense, lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useTernaryDarkMode } from 'usehooks-ts';

import { useAuth } from './hooks';
import Layout from './pages/Layout.jsx';
import routes from './routes.js';

import DefaultLoader from './components/Loaders/DefaultLoader.jsx';

const ProfilePage = lazy(() => import('./pages/profile'));
const SettingsPage = lazy(() => import('./pages/settings'));
const SnippetPage = lazy(() => import('./pages/snippet'));
const AboutPage = lazy(() => import('./pages/about'));
const SignUpPage = lazy(() => import('./pages/signup'));
const SignInPage = lazy(() => import('./pages/signin'));
const Landing = lazy(() => import('./pages/landing'));
const LicenseAgreement = lazy(() => import('./pages/license-agreement'));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password'));
const ResetPasswordPage = lazy(() => import('./pages/reset-password'));
const NotFoundPage = lazy(() => import('./pages/404'));
const EmbeddedPage = lazy(() => import('./pages/embed'));

function MyProfileRoute() {
  const username = useSelector((state) => state.user.userInfo.username);

  return <Navigate to={routes.profilePagePath(username)} replace />;
}

function ProtectedRoute({ redirectTo = routes.homePagePath(), isAllowed }) {
  if (isAllowed) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} replace />;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { isDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      isDarkMode ? 'dark' : 'light',
    );
  }, [isDarkMode]);

  return (
    <Suspense fallback={<DefaultLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path={routes.homePagePath()} element={<SnippetPage />} />
          <Route path={routes.snippetPagePath()} element={<SnippetPage />} />
          <Route path={routes.aboutPagePath()} element={<AboutPage />} />
          <Route path={routes.profilePagePath()} element={<ProfilePage />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={isLoggedIn}
                redirectTo={routes.signInPagePath()}
              />
            }
          >
            <Route
              path={routes.myProfilePagePath()}
              element={<MyProfileRoute />}
            />
            <Route
              path={routes.settingsPagePath()}
              element={<SettingsPage />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAllowed={!isLoggedIn}
                redirectTo={routes.myProfilePagePath()}
              />
            }
          >
            <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
            <Route path={routes.signInPagePath()} element={<SignInPage />} />
          </Route>

          <Route
            path={routes.forgotPassPagePath()}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={routes.resetPassPagePath()}
            element={<ResetPasswordPage />}
          />
          <Route
            path={routes.licenseAgreementPath()}
            element={<LicenseAgreement />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path={routes.embedSnippetPagePath()}
          element={<EmbeddedPage />}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
