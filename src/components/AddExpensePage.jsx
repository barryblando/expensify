import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    {/* Pass prop onSubmit to ExpenseForm */}
    <ExpenseForm
      onSubmit={expense => {
        props.dispatch(addExpense(expense));
        // go back to dashboard by Accessing props from react router
        props.history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
