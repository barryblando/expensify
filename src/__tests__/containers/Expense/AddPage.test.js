import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../../containers/Expense/AddPage';
import { expenses } from '../../fixtures/expenses';

describe('Add Expense Page', () => {
  let AddExpense;
  // let history;
  let wrapper;

  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    // right now we're creating spy for AddExpense dispatch prop & history
    AddExpense = jest.fn(); // 1st spy
    // history = { push: jest.fn() }; // 2nd spy
    // wrapper = shallow(<AddExpensePage AddExpense={AddExpense} history={history} />);
    wrapper = shallow(<AddExpensePage AddExpense={AddExpense} />);
  });

  test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle editExpense', () => {
    wrapper.find('Form').prop('onSubmit')(expenses[1]);
    // expect(history.push).toHaveBeenLastCalledWith('/expense-dashboard'); // expect history to have been last called with '/' route
    expect(AddExpense).toHaveBeenLastCalledWith(expenses[1]);
  });
});
