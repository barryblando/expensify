import { SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE, SET_START_DATE, SET_END_DATE } from '../constants';

// --------------------------------------------------
// ACTION CREATORS FOR EXPENSE & INCOME REDUCER
// --------------------------------------------------

export const setTextFilter = (text = '', filterType) => ({
  type: SET_TEXT_FILTER,
  text,
  filterType,
});

export const sortByAmount = filterType => ({
  type: SORT_BY_AMOUNT,
  filterType,
});

export const sortByDate = filterType => ({
  type: SORT_BY_DATE,
  filterType,
});

export const setStartDate = (startDate, filterType) => ({
  type: SET_START_DATE,
  startDate,
  filterType,
});

export const setEndDate = (endDate, filterType) => ({
  type: SET_END_DATE,
  endDate,
  filterType,
});
