import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// ------------------------------------------
// Store Creation using combineReducer
// for Multiple Reducers, when dispatching
// its gonna be dispatch to both reducers,
// but use switch to separate it by type
// ------------------------------------------

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tool
  );
  // </reference https://stackoverflow.com/questions/47343572/react-hot-reload-with-redux
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept([expensesReducer, filtersReducer], () => {
      const nextRootReducer = combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
      });
      store.replaceReducer(nextRootReducer);
    });
  }

  // when importing reducers and calling export default then return store
  return store;
};
