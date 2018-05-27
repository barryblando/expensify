import React from 'react';
import { shallow } from 'enzyme';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot(); // snap if render correctly
  // simulate(event, arg objects)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}, // fake preventDefault()
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot(); // snap if expected value matches
});

test('should set description on input change', () => {
  const value = 'New Description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(0) // at means index of element in a current wrapper
    .simulate('change', {
      persist: () => {}, // fake persist
      target: { value },
    });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New Note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    persist: () => {}, // fake persist 'cause textarea uses persist
    target: { value },
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '123.24';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value },
    });
  expect(wrapper.state('amount')).toBe(value); // if valid state should be set
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value },
    });
  expect(wrapper.state('amount')).toBe(''); // if invalid state should not be set
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn(); // using this spy we can access onSubmit prop
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe(''); // expect state error to be nothing
  // expect(onSubmitSpy).toHaveBeenCalled();
  // expect to match with the exact object, need to exclude the id
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toBe(now);
});

test('should set calender focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state('calendarFocused')).toBe(false);

  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
});
