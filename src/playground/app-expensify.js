import React from 'react';
import ReactDOM, { render } from 'react-dom';
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
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore(); // now can use dispatch, getState, & subscribe

store.dispatch(addExpense({ description: 'Water Bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Electricity Bill', amount: 50, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Car Rent', amount: 109500, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'Car Expense', amount: 109500, createdAt: 2000 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

// To access redux store we gonna use Provider
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// render App & its Components & sub Components to REACT DOM
render(app, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

// export default hot(module)(<AppRouter />); // for React hot loader

if (module.hot) {
  module.hot.accept(<AppRouter />, () => {
    const nextApp = <AppRouter />; // eslint-disable-line
    render(nextApp);
  });
}
