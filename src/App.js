import React, { Component } from 'react';
import ReactGA from 'react-ga';

import AppRouter from './AppRouter';

class App extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-129029377-1', { testMode: process.env.NODE_ENV === 'test' });
  }

  render() {
    return <AppRouter />;
  }
}

export default App;
