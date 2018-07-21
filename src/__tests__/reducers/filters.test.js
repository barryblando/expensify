import moment from 'moment';
import filtersReducer from '../../redux/reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    expenses: {
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
    },
    incomes: {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
    },
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT', filterType: 'expenses' });
  expect(state.expenses.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    expenses: {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined,
    },
    incomes: {
      text: '',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined,
    },
  };
  const action = { type: 'SORT_BY_DATE', filterType: 'incomes' };
  const state = filtersReducer(currentState, action); // expect sortBy amount to change to date by passing action
  expect(state.incomes.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'Rent',
    filterType: 'expenses',
  };
  const state = filtersReducer(undefined, action);
  expect(state.expenses.text).toBe('Rent');
});

test('should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate,
    filterType: 'incomes',
  };
  const state = filtersReducer(undefined, action);
  expect(state.incomes.startDate).toEqual(startDate);
});

test('should set enDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate,
    filterType: 'expenses',
  };
  const state = filtersReducer(undefined, action);
  expect(state.expenses.endDate).toEqual(endDate);
});
