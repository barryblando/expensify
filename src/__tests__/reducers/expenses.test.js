import expensesReducer from '../../reducers/expenses';
import { expenses } from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '109',
    description: 'Car Rental',
    note: 'Company Team Building',
    amount: 195000,
    createdAt: 0,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]); // using spread op
});

test('should edit an expense', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit expense if id not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
