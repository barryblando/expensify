import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

describe('Edit Expense Page', () => {
  let editExpense;
  let removeExpense;
  let history;
  let wrapper;

  // Runs a function before each of the tests in this file runs.
  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    editExpense = jest.fn(); // 1st spy
    removeExpense = jest.fn(); // 2nd spy
    history = { push: jest.fn() }; // 3rd spy
    wrapper = shallow(
      <EditExpensePage
        editExpense={editExpense}
        removeExpense={removeExpense}
        history={history}
        expense={expenses[2]}
      />
    );
  });

  test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/'); // expect history to have been last called with '/' route
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  });

  test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/'); // expect history to have been last called with '/' route
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id }); // expect to be {"id":"3"}
  });
});
