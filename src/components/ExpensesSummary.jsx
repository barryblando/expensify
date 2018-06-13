import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { selectExpensesTotal } from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import { CURRENCY_FORMAT } from '../constants';

export const ExpensesSummary = ({ expensesTotal, expenseCount }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(expensesTotal / 100).format(CURRENCY_FORMAT);
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord}, Totalling: <span>{formattedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button button--add-expense" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

// Map the State
const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  // get the length & total of the visible expenses
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
