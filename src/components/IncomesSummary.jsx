import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { selectIncomesTotal } from '../selectors/incomes-total';
import selectIncomes from '../selectors/incomes';
import { CURRENCY_FORMAT } from '../constants';

export const IncomesSummary = ({ incomesTotal, incomeCount }) => {
  const incomeWord = incomeCount === 1 ? 'income' : 'incomes';
  const formattedTotal = numeral(incomesTotal / 100).format(CURRENCY_FORMAT);
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{incomeCount}</span> {incomeWord}, Totalling: <span>{formattedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button button--add" to="/create-income">
            Add Income
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleIncomes = selectIncomes(state.incomes, state.filters);
  return {
    incomeCount: visibleIncomes.length,
    incomesTotal: selectIncomesTotal(visibleIncomes),
  };
};

export default connect(mapStateToProps)(IncomesSummary);
