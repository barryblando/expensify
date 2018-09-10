import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../../components/Form';

import { startAddExpense } from '../../redux/actions/expenses';

// export the unconnected component for Testing
export class AddExpensePage extends Component {
  onSubmit = expense => {
    const { AddExpense } = this.props;
    AddExpense(expense);
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
          {/* Pass onSubmit to Form as prop */}
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
