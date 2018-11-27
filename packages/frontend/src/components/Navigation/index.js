import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import Alert from 'react-bootstrap/lib/Alert';
import ReactGA from 'react-ga';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Notepad</Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </Navbar.Collapse>
    <Alert key="info" variant="info">
      {'Under construction - '}
      <ReactGA.OutboundLink
        eventLabel="https://github.com/ayildirim/notepad"
        to="https://github.com/ayildirim/notepad"
        target="_blank"
      >
        {"See what's cooking"}
      </ReactGA.OutboundLink>
    </Alert>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Navbar>
);
const NavigationAuth = ({ authUser }) => (
  <Nav className="mr-auto">
    <Nav.Link href={ROUTES.NOTES}>Notes</Nav.Link>
    <Nav.Link href={ROUTES.ACCOUNT}>Account</Nav.Link>
    <SignOutButton />
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="mr-auto">
    <Nav.Link href={ROUTES.SIGN_IN}>Sign in</Nav.Link>
  </Nav>
);

export default Navigation;
