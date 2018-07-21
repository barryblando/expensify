import moment from 'moment';
import { SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE, SET_START_DATE, SET_END_DATE } from '../constants';

// ------------------------------------------
// Filter Reducer
// ------------------------------------------
const filterReducerDefaultState = {
  expenses: {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), // for dateRangePicker filter
    endDate: moment().endOf('month'), // for dateRangePicker filter
  },
  incomes: {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  },
};

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          text: action.text,
        },
      };
    case SORT_BY_AMOUNT:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          sortBy: 'amount',
        },
      };
    case SORT_BY_DATE:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          sortBy: 'date',
        },
      };
    case SET_START_DATE:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          startDate: action.startDate,
        },
      };
    case SET_END_DATE:
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
