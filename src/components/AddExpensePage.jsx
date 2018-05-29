import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
// export the unconnected component for Testing
export class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props.addExpense(expense);
    // go back to dashboard by Accessing props from react router
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        {/* Pass prop onSubmit to ExpenseForm */}
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// pass this dispatch as prop on Add Expense
// This is the way to return dispatcher function, allowing to obstruct them away from the component itself
const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

// set mapStateToProps to undefined 'cause we're not using it
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
