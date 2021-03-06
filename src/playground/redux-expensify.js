import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ---- Redux without Firebase ----
// Component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// ---- Redux with Firebase ----
// Component calls action generator
// action generator returns function
// component dispatches function (?) P.S gonna use redux-thunk middleware so redux can support dispatching function
// functions runs (has the ability to dispatch other actions and do whatever it wants)

// ------------------------------------------
// ACTIONS FOR EXPENSE ARRAY REDUCER
// ------------------------------------------

// -- ADD_EXPENSE --
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// -- REMOVE_EXPENSE 'no default required' --
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// -- EDIT_EXPENSE --
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// ------------------------------------------
// ACTIONS FOR FILTER OBJECT REDUCER
// ------------------------------------------

// -- SET_TEXT_FILTER --
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// -- SORT_BY_AMOUNT --
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// -- SORT_BY_DATE --
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// -- SET_START_DATE --
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

// -- SET_END_DATE --
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// ------------------------------------------
// Expenses Reducer
// ------------------------------------------
const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
  // console.log('Expenses Running..');
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]; // using spread op same result as concat creating new array state rather than changing the prevState
    case 'REMOVE_EXPENSE':
      // state.map(expense => console.log(expense)); destruct expense array object only id in filter
      return state.filter(({ id }) => id !== action.id); // filtered out if not match
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        // check if current expense iterating over by map match to action id
        if (expense.id === action.id) {
          // return brand new object & by using object spread operator
          return {
            ...expense, // grab all existing properties
            ...action.updates, // override any of the ones in expense that are pass down by updates
          };
        }
        return expense; // if no changes return
      });
    default:
      return state;
  }
};

// ------------------------------------------
// Filter Reducer
// ------------------------------------------
const filterReducerDefaultState = {
  expenses: {
    text: '',
    sortBy: 'date',
    startDate: 2, // for dateRangePicker filter
    endDate: 3, // for dateRangePicker filter
  },
  incomes: {
    text: '',
    sortBy: 'amount',
    startDate: 4, // for dateRangePicker filter
    endDate: 5, // for dateRangePicker filter
  },
};

const filter1 = {
  ...filterReducerDefaultState,
  incomes: {
    ...filterReducerDefaultState.incomes,
    text: 'Moo',
  },
};

const filter2 = {
  ...filterReducerDefaultState,
  expenses: {
    ...filterReducerDefaultState.expenses,
    sortBy: 'amount',
  },
};

console.log(filter1); // ?
console.log(filter2); // ?

const filtersReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          text: action.text,
        },
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          sortBy: 'amount',
        },
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          sortBy: 'date',
        },
      };
    case 'SET_START_DATE':
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          startDate: action.startDate,
        },
      };
    case 'SET_END_DATE':
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          endDate: action.endDate,
        },
      };
    default:
      return state;
  }
};

// ------------------------------------------
// GET VISIBLE EXPENSES
// ------------------------------------------
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  // Filtering out
  expenses
    .filter(expense => {
      // -------- LOGIC START --------
      // if startDate or endDate is a number then proceed to next condition (otherwise won't be filtered)
      // if createdAt is greater than startDate or less than endDate, do included in filter expenses (otherwise filtered out)
      // and if expenses.description has the text variable string inside of it (lowercase sensitive)
      // -------- LOGIC END --------
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      let sortedValue;
      if (sortBy === 'date') {
        // <reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        sortedValue = a.createdAt < b.createdAt ? 1 : -1; // if true return b/1 else a/-1
      } else if (sortBy === 'amount') {
        sortedValue = a.amount < b.amount ? 1 : -1;
      }
      return sortedValue;
    });

// ------------------------------------------
// Store Creation using combineReducer
// for Multiple Reducers, when dispatching
// its gonna be dispatch to both reducers,
// but use switch to separate it by type
// ------------------------------------------
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

// ------------------------------------------
// Store subscribe to track state changes
// in execution context of store creation &
// every time there's a dispatch
// ------------------------------------------
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'January rent payment', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(
  addExpense({ description: 'Gaming PC', note: 'Hardcore Gaming', amount: 1000000, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('pc'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
