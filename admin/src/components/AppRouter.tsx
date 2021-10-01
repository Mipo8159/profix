import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';

const AppRouter: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <Redirect to={RouteNames.DASHBOARD} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <Redirect to={RouteNames.SIGNIN} />
    </Switch>
  );
};

export default AppRouter;
