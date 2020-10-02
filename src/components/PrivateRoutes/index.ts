import React from 'react';
import PrivateAdminRoute from './PrivateAdminRoute';
import PrivateEditRoute from './PrivateEditRoute';
import PrivateProfileRoute from './PrivateProfileRoute';
import { RouteProps } from 'react-router-dom';

export interface IPrivateRoute extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
}

export { PrivateProfileRoute, PrivateEditRoute, PrivateAdminRoute };
