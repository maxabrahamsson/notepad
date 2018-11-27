import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import withTracker from '../../withTracker';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import NotesPage from '../Notes';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      <hr />
      <Route exact path={ROUTES.DEFAULT} component={withTracker(NotesPage)} />
      <Route exact path={ROUTES.NOTES} component={withTracker(NotesPage)} />
      <Route exact path={ROUTES.SIGN_UP} component={withTracker(SignUpPage)} />
      <Route exact path={ROUTES.SIGN_IN} component={withTracker(SignInPage)} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={withTracker(PasswordForgetPage)} />
      <Route exact path={ROUTES.ACCOUNT} component={withTracker(AccountPage)} />
      <hr />
    </div>
  </Router>
);

export default withAuthentication(App);
