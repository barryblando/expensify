import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize'; // fixed ThemedStyleSheet undefined

// Hot Module Replacement
import { hot } from 'react-hot-loader';

// App, Style, Reset
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css'; // import default style for date picker
import AppRouter from './routers/AppRouter';
import './styles/style.scss';

// State Management (Redux), actions
import configureStore from './store/configureStore';

// const store = configureStore(); // now can use dispatch, getState, & subscribe

// To access redux store we gonna use Provider
const app = (
  <Provider store={configureStore}>
    <AppRouter />
  </Provider>
);

render(app, document.getElementById('app'));

export default hot(module)(<AppRouter />); // for React hot loader

// if (module.hot) {
//   module.hot.accept(<AppRouter />, () => {
//     const nextApp = <AppRouter />; // eslint-disable-line
//     render(nextApp);
//   });
// }
