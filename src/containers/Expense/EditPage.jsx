import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../../components/Form';

import { startEditExpense, startRemoveExpense } from '../../redux/actions/expenses';

export class EditExpensePage extends Component {
  onSubmit = expenseData => {
    const { EditExpense, expense } = this.props;
    // Dispatch the action to edit the expense
    EditExpense(expense.id, expenseData);
  };

  onRemove = () => {
    const { RemoveExpense, expense } = this.props;
    // Dispatch the action to remove the expense
    RemoveExpense({ id: expense.id }); // data
  };

  render() {
    const { expense } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Edit Expense</h1>
            <Link className="button button--back" to="/expense-dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass expense & onSubmit to Form as prop */}
          <Form onSubmit={this.onSubmit} expense={expense} />
          <button className="button button--remove" type="button" onClick={this.onRemove}>
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

// Find the expense that needs to update, access props that are passed in by HOC props.match
const mapStateToProps = (state, { match }) => ({
  expense: state.expenses.find(expense => expense.id === match.params.id), // if found put that object to expense
});

// Pass dispatchers as props
const mapDispatchToProps = dispatch => ({
  EditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  RemoveExpense: data => dispatch(startRemoveExpense(data)),
});

// React Router pass props object to components so that it can be manipulate dynamically
// React Router render HOC(i.e connect) then passes the props through and allows to add new ones
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);

// -- HOC ? let's say our WrappedComponent is EditExpensePage --
// const connect = (injectedStateProp, injectedDispatchProp) => {
//   **CLOSURE**
//   - we can still have access to variable StateProp & DispatchProp 'cause of scope chain & lexical env
//   return (WrappedComponent) => {
//     - props here are values injected by other Component (e.g Router that passes down match prop)
//     - return function that returns WrappedComponent w/ props to render
//     return (props) => <WrappedComponent {...injectedStateProp} {...injectedDispatchProp} {...props} />
//   };
// };
//
//   **CURRYING**
// connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
