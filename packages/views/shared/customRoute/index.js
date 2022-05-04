/* eslint-disable complexity */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getActiveTokenAccount } from '@wallet/utils/account';
import Piwik from '@common/utilities/piwik';
import routes from '@screens/router/routes';
import Login from 'src/modules/auth/components/Signin';
import offlineStyle from '@basics/offlineWrapper/offlineWrapper.css';
import ErrorBoundary from './errorBoundary';

const checkNetwork = state =>
  !!state.network.name
  && !!(state.network.networks
    && state.network.networks.LSK
    && state.network.networks.LSK.serviceUrl);

// eslint-disable-next-line max-statements
const CustomRoute = ({
  path,
  exact,
  isPrivate,
  forbiddenTokens,
  component,
  t,
  history,
}) => {
  const wallet = useSelector(state => getActiveTokenAccount(state));
  const token = useSelector(state => state.token);
  const isAuthenticated = useSelector(state =>
    (state.wallet.info && state.wallet.info[token.active]));
  const isNetworkSet = useSelector(checkNetwork);
  const { search = '' } = history.location;

  Piwik.tracking(history, token);

  if (forbiddenTokens.indexOf(token.active) !== -1) {
    return <Redirect to={`${routes.dashboard.path}`} />;
  }

  if (isPrivate && !isAuthenticated) {
    return (
      <Redirect
        to={`${routes.login.path}?referrer=${path.replace(/\/(send|vote)/, '')}&${search.replace(/^\?/, '')}`}
      />
    );
  }

  if (wallet.info?.LSK?.summary?.isMigrated === false
    && history.location.pathname !== routes.reclaim.path
    && history.location.pathname !== routes.login.path
    && isAuthenticated) {
    return <Redirect to={`${routes.reclaim.path}`} />;
  }

  return (
    <main className={`${isPrivate ? offlineStyle.disableWhenOffline : ''} offlineWrapper`}>
      <ErrorBoundary errorMessage={t('An error occurred while rendering this page')}>
        <Route
          path={isNetworkSet ? path : routes.login.path}
          exact={exact}
          key={isNetworkSet ? path : routes.login.path}
          component={isNetworkSet ? component : Login}
        />
      </ErrorBoundary>
    </main>
  );
};

CustomRoute.defaultProps = {
  t: str => str,
  pathSuffix: '',
  pathPrefix: '',
};

export default CustomRoute;
