import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// fixed ThemedStyleSheet undefined
import 'react-dates/initialize';

// Hot Module Replacement
import { hot } from 'react-hot-loader';

import { push } from 'connected-react-router';

// App, Style, Reset
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css'; // import default style for date picker
import AppRouter, { history } from './routers/AppRouter';
import './styles/style.scss';

// Firebase
import { firebase } from './firebase/firebase';

// State Management (Redux), actions, now can use dispatch, getState, & subscribe
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

const store = configureStore;

// To access redux store we gonna use Provider
const app = (
  <ReduxProvider store={configureStore}>
    <AppRouter />
  </ReduxProvider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    render(app, document.getElementById('app'));
    hasRendered = true;
  }
};

console.log(store.getState().auth.uid);

render(<p>Loading...</p>, document.getElementById('app'));

// this allows to run this function every single time the auth state change including the first load of the app
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        push('/dashboard');
      }
      console.log('logged in', user.uid);
    });
  } else {
    store.dispatch(logout());
    renderApp();
    push('/');
    console.log('logged out');
  }
});

export default hot(module)(app); // for React hot loader
