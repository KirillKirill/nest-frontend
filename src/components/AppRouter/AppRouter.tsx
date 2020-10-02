import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Register from 'components/Register';
import Login from 'components/Login';
import Profile from 'components/Profile';
import Admin from 'components/Admin';
import Users from 'components/Users';
import EditProfile from 'components/EditProfile';
import NavBar from 'components/NavBar';
import {
  PrivateProfileRoute,
  PrivateEditRoute,
  PrivateAdminRoute,
} from 'components/PrivateRoutes';

export const history = createBrowserHistory();

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <PrivateProfileRoute exact path='/' component={Profile} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/users' component={Users} />
        <PrivateEditRoute path='/edit' component={EditProfile} />
        <PrivateAdminRoute path='/admin' component={Admin} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
