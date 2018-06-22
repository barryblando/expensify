import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
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

const logger = createLogger(); // to log prevState & nextState

const configureStore = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  defaultState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunkMiddleware, logger))
);

// </reference https://stackoverflow.com/questions/47343572/react-hot-reload-with-redux
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/index', () => {
    const nextRootReducer = require('../reducers/index').default; // eslint-disable-line
    configureStore.replaceReducer(connectRouter(history)(rootReducer));
  });
}

export default configureStore;
