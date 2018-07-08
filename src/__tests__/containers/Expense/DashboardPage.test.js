import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { expenses } from '../../fixtures/expenses';
import ExpenseDashboardPage from '../../../containers/Expense/DashboardPage';

const mockStore = configureMockStore();
const store = mockStore({});

test('should render Dashboard correctly', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ExpenseDashboardPage expenseCount={2} expensesTotal={243} expenses={expenses[0]} />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
