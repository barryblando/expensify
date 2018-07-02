import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../constants';

// ------------------------------------------
// Expenses Reducer
// ------------------------------------------
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      // using spread op same result as concat creating new array state rather than changing the prevState
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      // destruct expense array object only id in filter, filtered out if not match
      return state.filter(({ id }) => id !== action.id);
    case EDIT_EXPENSE:
      return state.map(expense => {
        // check if current expense iterating over by map match to action id
        if (expense.id === action.id) {
          // return brand new object by using object spread operator
          return {
            ...expense, // grab all current properties in expense object
            ...action.updates, // override the ones in current expense object that are pass down by updates
          };
        }
        return expense; // if no changes return
      });
    case SET_EXPENSES:
      return action.expenses;
    default:
      return state;
  }
};
