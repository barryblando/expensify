import React from 'react';
import { shallow } from 'enzyme';
import ExpensesSummary from '../../components/Summary';

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} expense />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={285} expense />);
  expect(wrapper).toMatchSnapshot();
});
