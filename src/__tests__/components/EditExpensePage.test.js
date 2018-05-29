import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense;
let removeExpense;
let history;
let wrapper;

beforeEach(() => {
  // create Spies to access AddExpense props
  editExpense = jest.fn(); // 1st spy
  removeExpense = jest.fn(); // 2nd spy
  history = { push: jest.fn() }; // 3rd spy
  wrapper = shallow(
    <EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[2]} />
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
