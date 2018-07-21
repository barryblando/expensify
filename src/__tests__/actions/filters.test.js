import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../redux/actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0), 'expenses');
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
    filterType: 'expenses',
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0), 'incomes');
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
    filterType: 'incomes',
  });
});

test('should generate set text filter action object', () => {
  const action = setTextFilter('Rent', 'expenses');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Rent',
    filterType: 'expenses',
  });
});

test('should generate set text filter action object with default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
    filterType: undefined,
  });
});

test('should generate sort by amount action object', () => {
  expect(sortByAmount('expenses')).toEqual({
    type: 'SORT_BY_AMOUNT',
    filterType: 'expenses',
  });
});

test('should generate sort by date action object', () => {
  expect(sortByDate('incomes')).toEqual({
    type: 'SORT_BY_DATE',
    filterType: 'incomes',
  });
});
