import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactGA.initialize('UA-129029377-1', { testMode: process.env.NODE_ENV === 'test' });

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
