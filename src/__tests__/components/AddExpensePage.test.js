import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

describe('Add Expense Page', () => {
  let addExpense;
  let history;
  let wrapper;

  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    addExpense = jest.fn(); // 1st spy
    history = { push: jest.fn() }; // 2nd spy
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
  });

  test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/'); // expect history to have been last called with '/' route
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
  });
});
