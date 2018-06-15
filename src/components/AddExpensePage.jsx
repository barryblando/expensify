import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// export the unconnected component for Testing
export class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    // go back to dashboard by Accessing props from react router
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Add Expense</h1>
            <Link className="button button--back" to="/dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass prop onSubmit to ExpenseForm */}
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

// pass this dispatcher as prop on AddExpensePage
// This is the way to return dispatcher function, allowing to obstruct them away from the component itself
const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense)),
});

// set mapStateToProps to undefined 'cause we're not using it
export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
