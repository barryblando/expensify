import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../constants';

// ------------------------------------------
// Expenses Reducer
// ------------------------------------------
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense]; // using spread op same result as concat creating new array state rather than changing the prevState
    case REMOVE_EXPENSE:
      // state.map(expense => console.log(expense)); destruct expense array object only id in filter
      return state.filter(({ id }) => id !== action.id); // filtered out if not match
    case EDIT_EXPENSE:
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
    case SET_EXPENSES:
      // console.log(state);
      return action.expenses;
    default:
      return state;
  }
};
