import React from 'react';
import ExpenseList from './ExpenseList'; /* eslint-disable-line */
import ExpenseListFilters from './ExpenseListFilters'; /* eslint-disable-line */
import ExpensesSummary from './ExpensesSummary'; /* eslint-disable-line */

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
