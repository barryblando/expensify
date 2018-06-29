import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import { expenses } from '../fixtures/expenses';

describe('Edit Expense Page', () => {
  let EditExpense;
  let RemoveExpense;
  let history;
  let wrapper;

  // Runs a function before each of the tests in this file runs.
  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    EditExpense = jest.fn(); // 1st spy
    RemoveExpense = jest.fn(); // 2nd spy
    history = { push: jest.fn() }; // 3rd spy
    wrapper = shallow(
      <EditExpensePage
        EditExpense={EditExpense}
        RemoveExpense={RemoveExpense}
        history={history}
        expense={expenses[2]}
      />
    );
  });

  test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle editExpense', () => {
    wrapper.find('Form').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/expense-dashboard'); // expect history to have been last called with '/' route
    expect(EditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  });

  test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/expense-dashboard'); // expect history to have been last called with '/' route
    expect(RemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id }); // expect to be {"id":"3"}
  });
});
