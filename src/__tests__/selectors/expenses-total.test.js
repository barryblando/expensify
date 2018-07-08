import { selectExpensesTotal } from '../../redux/selectors/expenses-total';
import { expenses } from '../fixtures/expenses';

test('should return 0 if no expense', () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
  const expense = expenses[0];
  expect(selectExpensesTotal([expense])).toBe(expense.amount);
});

test('should correctly add up a multiple expense', () => {
  expect(selectExpensesTotal(expenses)).toBe(1099695);
});
