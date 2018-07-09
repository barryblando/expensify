import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ListItem';
import { expenses } from '../fixtures/expenses';

test('should render ExpenseListItem with expenses', () => {
  // ----------------------------------------> spread out props, to destruct there
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
