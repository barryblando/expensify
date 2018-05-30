import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
// </reference https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often
// export this unconnected Component for snapshot test case
export const ExpenseList = props => (
  <div>
    <h1>ExpenseList</h1>
    {/* To pass state expense. spread it out through the props in ExpenseListItem so destruct is possible */}
    {props.expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      props.expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)
    )}
  </div>
);

// when connected this maps the redux store to access and pass state to component as props
// will use the selector expenses
const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

// Connect component to redux store using Higher Order Component
// function in connect determines what information from the store we want our ExpenseList to be able to access
// Implicitly Export default the Connected Component
export default connect(mapStateToProps)(ExpenseList);
