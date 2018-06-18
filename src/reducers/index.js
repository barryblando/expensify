import { combineReducers } from 'redux';

import expensesReducer from './expenses';
import incomesReducer from './incomes';
import filtersReducer from './filters';
import authReducer from './auth';

const rootReducer = combineReducers({
  expenses: expensesReducer,
  incomes: incomesReducer,
  filters: filtersReducer,
  auth: authReducer,
});

export default rootReducer;
