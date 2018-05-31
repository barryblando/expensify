import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import expensesReducer from './expenses';
import filtersReducer from './filters';

const rootReducer = combineReducers({ expenses: expensesReducer, filters: filtersReducer });

export default rootReducer;
