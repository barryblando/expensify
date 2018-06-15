import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  // React Router pass props object to components
  // so that it can be manipulate dynamically
  onSubmit = expense => {
    // Dispatch the action to edit the expense
    this.props.startEditExpense(this.props.expense.id, expense);
    console.log('updated:', expense);
    // Redirect to the dashboard
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id }); // data
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Edit Expense</h1>
            <Link className="button button--back" to="/dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass prop expense & onSubmit to ExpenseForm */}
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--remove" onClick={this.onRemove}>
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

// Find the expense that needs to update, access props that are passed in by HOC
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id), // if found put object to expense
});

// Pass dispatchers as props
const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
});

// React Router render HOC then passes the props through and allows to add new ones
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
