import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { selectExpensesTotal } from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import { CURRENCY_FORMAT } from '../constants';

export const ExpensesSummary = ({ expensesTotal, expenseCount }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(expensesTotal / 100).format(CURRENCY_FORMAT);
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord}, Totalling: {formattedTotal}
      </h1>
    </div>
  );
};

// Map the State
const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters); // get the length

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses), // get the total of the visible expenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
