import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import Alert from 'react-bootstrap/lib/Alert';
import ReactGA from 'react-ga';
import withTracker from './withTracker';

// Pages
import Main from './Pages/Main';
import SingleNote from './Pages/SingleNote';

const Pages = [{ component: Main, link: 'Home' }, { component: SingleNote, link: 'SingleNote' }];

const camelize = function camelize(str) {
  return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
};

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/#/home">Notepad</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {Pages.map(page => (
                  <Nav.Link href={`/#/${camelize(page.link)}`}>{page.link}</Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
            <Alert key="info" variant="info">
              {'Under construction - '}
              <ReactGA.OutboundLink
                eventLabel="https://github.com/ayildirim/notepad"
                to="https://github.com/ayildirim/notepad"
                target="_blank"
              >
                See what's cooking
              </ReactGA.OutboundLink>
            </Alert>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Navbar>
          <Route path="/" exact component={withTracker(Main)} />
          {Pages.map(page => (
            <Route path={`/${camelize(page.link)}`} exact component={withTracker(page.component)} />
          ))}
        </div>
      </Router>
    );
  }
}

export default AppRouter;
