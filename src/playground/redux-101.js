import { createStore } from 'redux';

// Action Generators - functions that return action objects,
// pros of using to avoid typos on type & other key:value pair when putting manually to an object to dispatch
// set default destruct object key value to 1 and object properties to empty object to avoid TypeError of undefined
// Implicit return object when using arrow function: ({ key: value })
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

// no default value empty object cause set count is mandatory when setting
const setCount = ({ count = 1 }) => ({
  type: 'SET',
  count,
});

const resetCount = () => ({
  type: 'RESET',
});

// Reducers
// 1. Never change state or action, just reading off of two arguments/parameters
// 2. Reducers are pure functions
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // return state
      return { count: state.count + action.incrementBy };
    case 'DECREMENT':
      // return state
      return { count: state.count - action.decrementBy };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.count };
    default:
      return state;
  }
};

// Store
// - Single source of truth (single big object of state)
// is where you create your state container, params can't be empty </reference https://redux.js.org/basics/store
// when setting parameters this is same as this.setState((prevState) => { return prevState });
// but use reducers as parameter
const store = createStore(countReducer);

// Subscribing when state changes/mutates, invoked automatically in execution context
// store it in unsubscribe variable in order to stop Subscribing after specific dispatch
const unsubscribe = store.subscribe(() => {
  console.log(store.getState()); // return current state object
});

// Actions - an object that gets sent to the store </reference https://redux.js.org/basics/actions

// I'd like to increment the count,custom key:value pair and pass to action generator and destruct it
store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount({ incrementBy: 2 }));

// unsubscribe
// unsubscribe();

// I'd like to decrement the count
store.dispatch(decrementCount({ decrementBy: 5 }));

// I'd like to reset the count to zero
store.dispatch(resetCount());

store.dispatch(setCount({ count: 100 }));
