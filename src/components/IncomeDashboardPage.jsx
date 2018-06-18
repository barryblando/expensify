import React from 'react';
import IncomeList from './IncomeList'; /* eslint-disable-line */
import ListFilters from './ListFilters'; /* eslint-disable-line */
import IncomesSummary from './IncomesSummary'; /* eslint-disable-line */

const IncomeDashboardPage = () => (
  <div>
    <IncomesSummary />
    <ListFilters />
    <IncomeList />
  </div>
);

export default IncomeDashboardPage;
