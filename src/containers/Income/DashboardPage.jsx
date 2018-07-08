import React from 'react';
import { connect } from 'react-redux';

import ListFilters from '../ListFilters'; /* eslint-disable-line */

import IncomesSummary from '../../components/Summary';
import IncomeList from '../../components/Income/List';

import { selectIncomesTotal } from '../../redux/selectors/incomes-total';
import selectIncomes from '../../redux/selectors/incomes';

const IncomeDashboardPage = ({ incomeCount, incomesTotal, incomes }) => (
  <div>
    <IncomesSummary Total={incomesTotal} Count={incomeCount} income />
    <ListFilters />
    <IncomeList incomes={incomes} />
  </div>
);

const mapStateToProps = state => {
  const visibleIncomes = selectIncomes(state.incomes, state.filters);
  return {
    incomeCount: visibleIncomes.length,
    incomesTotal: selectIncomesTotal(visibleIncomes),
    incomes: visibleIncomes,
  };
};

export default connect(mapStateToProps)(IncomeDashboardPage);
