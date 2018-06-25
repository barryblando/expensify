import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// fixed ThemedStyleSheet undefined
import 'react-dates/initialize';

// Connected Router
import { push } from 'connected-react-router';

// Style, Reset
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css'; // import default style for date picker
import './styles/style.scss';

// App & Loading Page
import AppRouter from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import history from './routers/dev-history';

// Firebase
import { firebase } from './firebase/firebase';

// store configured, can now use dispatch, getState, & subscribe
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { startSetIncomes } from './actions/incomes';
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

function setExpensesIncomes() {
  return async dispatch => {
    const dispatchExpenses = dispatch(startSetExpenses());
    const dispatchIncomes = dispatch(startSetIncomes());
    const result = await Promise.all([dispatchExpenses, dispatchIncomes]);
    return result;
  };
}

console.log(store.getState().auth.uid);

render(<LoadingPage />, document.getElementById('app'));

// this callback function in onAuthStateChange runs every single time the auth state change, including the first load of the app
// i.e by dispatching startLogin / startLogout
firebase.auth().onAuthStateChanged(user => {
  // if there's a user authenticated
  if (user) {
    // dispatch action login to store uid
    store.dispatch(login(user.uid));
    // dispatch action setExpenses & get the authenticated uid from the state
    store.dispatch(setExpensesIncomes()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        push('/dashboard');
      }
      console.log('logged in:', user.uid);
    });
  } else {
    store.dispatch(logout());
    renderApp();
    push('/');
    console.log('logged out');
  }
});
