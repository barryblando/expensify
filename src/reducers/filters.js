import moment from 'moment';
import { SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE, SET_START_DATE, SET_END_DATE } from '../constants';

// ------------------------------------------
// Filter Reducer
// ------------------------------------------
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'), // for dateRangePicker filter
  endDate: moment().endOf('month'), // for dateRangePicker filter
};

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text,
      };
    case SORT_BY_AMOUNT:
      return {
        ...state,
        sortBy: 'amount',
      };
    case SORT_BY_DATE:
      return {
        ...state,
        sortBy: 'date',
      };
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};
