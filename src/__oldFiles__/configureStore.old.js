import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// ------------------------------------------
// Store Creation using combineReducer
// for Multiple Reducers, when dispatching
// its gonna be dispatch to both reducers,
// but use switch to separate it by type
// ------------------------------------------

// Create an object for the default data
const defaultState = {
  expenses: [],
  incomes: [],
  filters: {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const configureStore = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  // rootReducer,
  defaultState,
  // composeEnhancers(applyMiddleware(thunk))
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tool
);

// </reference https://stackoverflow.com/questions/47343572/react-hot-reload-with-redux
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/', () => {
    const nextRootReducer = require('../reducers/index').default; // eslint-disable-line
    configureStore.replaceReducer(nextRootReducer);
  });
}

export default configureStore;
