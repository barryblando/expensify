import React from 'react';
import ExpenseList from './ExpenseList'; /* eslint-disable-line */
import ListFilters from './ListFilters'; /* eslint-disable-line */
import ExpensesSummary from './ExpensesSummary'; /* eslint-disable-line */

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
