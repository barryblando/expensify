import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from './Form';
import { startAddExpense } from '../actions/expenses';

// export the unconnected component for Testing
export class AddExpensePage extends Component {
  onSubmit = expense => {
    const { AddExpense, history } = this.props;
    AddExpense(expense);
    // go back to dashboard by Accessing props from react router
    history.push('/expense-dashboard');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Add Expense</h1>
            <Link className="button button--back" to="/expense-dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass prop onSubmit to ExpenseForm */}
          <Form onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

// pass this dispatcher as prop on AddExpensePage
// This is the way to return dispatcher function, allowing to obstruct them away from the component itself
const mapDispatchToProps = dispatch => ({
  AddExpense: expense => dispatch(startAddExpense(expense)),
});

// set mapStateToProps to undefined 'cause we're not using it
export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
