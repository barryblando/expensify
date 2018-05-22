import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
const ExpenseList = props => (
  <div>
    <h1>ExpenseList</h1>
    {/* To pass state expense. Destruct it through the props in ExpenseListItem */}
    {props.expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)}
  </div>
);

// a function that maps the store state to component props
// this will use the filter selector
const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

// Connect component to redux store using Higher Order Component
// function in connect determines what information from the store we want our ExpenseList to be able to access
export default connect(mapStateToProps)(ExpenseList);
