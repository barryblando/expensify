import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

describe('Add Expense Page', () => {
  let startAddExpense;
  let history;
  let wrapper;

  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    startAddExpense = jest.fn(); // 1st spy
    history = { push: jest.fn() }; // 2nd spy
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
  });

  test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle editExpense', () => {
    wrapper.find('Form').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/expense-dashboard'); // expect history to have been last called with '/' route
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  });
});
