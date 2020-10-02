import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from 'utils';
import { IPrivateRoute } from './index';

const PrivateEditRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const isAuth = getToken()?.token;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default PrivateEditRoute;
