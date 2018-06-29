import { ADD_INCOME, EDIT_INCOME, REMOVE_INCOME, SET_INCOMES } from '../constants';

// ------------------------------------------
// Incomes Reducer
// ------------------------------------------
const incomeReducerDefaultState = [];

export default (state = incomeReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return [...state, action.income];
    case REMOVE_INCOME:
      return state.filter(({ id }) => id !== action.id); // filtered out if not match
    case EDIT_INCOME:
      return state.map(income => {
        if (income.id === action.id) {
          return {
            ...income, // grab all existing properties
            ...action.updates, // override any of the ones in expense that are pass down by updates
          };
        }
        return income; // if no changes return
      });
    case SET_INCOMES:
      return action.incomes;
    default:
      return state;
  }
};
