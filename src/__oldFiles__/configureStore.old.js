export default () => {
  const store = createStore(
    rootReducer,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tool
  );
  // </reference https://stackoverflow.com/questions/47343572/react-hot-reload-with-redux
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  // when importing reducers and calling export default then return store
  return store;
};
