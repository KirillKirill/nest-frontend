import React from 'react';
import jwtDecode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from 'utils';
import { IPrivateRoute } from './index';
import { Decoded } from 'types';

const PrivateAdminRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const isAuthToken = getToken()?.token;
  const isAdmin = jwtDecode<Decoded>(getToken()?.token!).role === 'admin';
  return (
    <Route
      {...rest}
      render={props =>
        isAuthToken && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
