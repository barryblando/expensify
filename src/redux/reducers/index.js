import { combineReducers } from 'redux';

import expensesReducer from './expenses';
import incomesReducer from './incomes';
import filtersReducer from './filters';
import authReducer from './auth';

// --------------------------------------------------
// Store Creation using combineReducer for Multiple
// Reducers, when dispatching action its gonna be
// dispatched to reducers(if you have more than one
// reducer), but use switch to separate it by type
// --------------------------------------------------

// Redux uses `switch..case` well. Reducers are composable, so case bloat is not a problem.
// If your list of cases gets too large, break off pieces and move them into separate reducers.

// Reducers must be the Single Source of Truth
// But it’s OK to have different sources of truth for different things.
const rootReducer = combineReducers({
  expenses: expensesReducer,
  incomes: incomesReducer,
  filters: filtersReducer,
  auth: authReducer,
});

export default rootReducer;
