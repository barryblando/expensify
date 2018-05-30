import React from 'react';
import ExpenseList from './ExpenseList'; /* eslint-disable-line */
import ExpenseListFilters from './ExpenseListFilters'; /* eslint-disable-line */

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
