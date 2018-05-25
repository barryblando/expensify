import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

const moment = require('moment');

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  // text was 'e' so Credit Card & Rent expected to be filtered in
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  // sortBy was 'date' and startDate was 0(not negative) so Credit Card & Gum expected to be filtered in
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    // this gonna filter out items created further than 2 days away from this point of time(0)
    endDate: moment(0).add(2, 'days'),
  };
  const result = selectExpenses(expenses, filters);
  // sortBy was 'date' and endDate was 2 days away so Gum & Rent expected to be filtered in
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should filter by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  // sortBy was 'date' so Credit Card, Gum & Rent expected to be filtered in
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should filter by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  // sortBy was 'amount' so Rent, Credit Card & Gum expected to be filtered in
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
