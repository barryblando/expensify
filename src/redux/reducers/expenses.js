import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../constants';

// ------------------------------------------
// Expenses Reducer (PURE FUNCTION)
// Make state transactional as possible
// ------------------------------------------
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      // Make object & array immutable as possible
      // using spread operator to create new array state rather than mutating the prevState
      // & to prevent side effects. [...copying prevState, adding newObject]
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      // create new expense array object using filter, return/filtered out if not match, otherwise don't include
      return state.filter(({ id }) => id !== action.id);
    case EDIT_EXPENSE:
      // return new constructed state array containing previous objects and the updated one
      return state.map(expense => {
        // check if current expense iterating over match to action id
        if (expense.id === action.id) {
          // return brand new object
          return {
            ...expense, // grab all properties from current expense object
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
