import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import history from '../../routers/dev-history';
import rootReducer from '../reducers/index';

// Create an object for the default data
const defaultState = {
  expenses: [],
  incomes: [],
  filters: {
    expenses: {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined,
    },
    incomes: {
      text: '',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined,
    },
  },
};

const loggerMiddleware = createLogger(); // to log prevState & nextState

// INFO: All compose does is let you write deeply nested function transformations without the rightward drift of the code.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore =
  process.env.NODE_ENV !== 'production'
    ? createStore(
        connectRouter(history)(rootReducer), // new root reducer with router state
        defaultState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunkMiddleware, loggerMiddleware))
      )
    : createStore(
        connectRouter(history)(rootReducer), // new root reducer with router state
        defaultState,
        applyMiddleware(routerMiddleware(history), thunkMiddleware)
      );

// </reference https://stackoverflow.com/questions/47343572/react-hot-reload-with-redux
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = connectRouter(history)(rootReducer); // eslint-disable-line
    configureStore.replaceReducer(nextRootReducer);
  });
}

export default configureStore;
