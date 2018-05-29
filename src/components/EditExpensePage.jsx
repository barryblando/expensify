import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  onSubmit = expense => {
    // Dispatch the action to edit the expense
    this.props.editExpense(this.props.expense.id, expense);
    console.log('updated:', expense);
    // Redirect to the dashboard
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id }); // data
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Edit Expense</h1>
        {/* Pass prop expense & onSubmit to ExpenseForm */}
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

// const EditExpensePage = props => {
//   // React Router pass props object to components
//   // so that it can be manipulate dynamically
//   console.log(props);
//   // return <div>Editing the expense with id of {props.match.params.id}</div>;
//   return (
//     <div>
//       <h1>Edit Expense</h1>
//       {/* Pass prop expense & onSubmit to ExpenseForm */}
//       <ExpenseForm
//         expense={props.expense}
//         onSubmit={expense => {
//           // Dispatch the action to edit the expense
//           props.dispatch(editExpense(props.expense.id, expense));
//           console.log('updated', expense);
//           // Redirect to the dashboard
//           props.history.push('/');
//         }}
//       />
//       <button
//         onClick={() => {
//           props.dispatch(removeExpense({ id: props.expense.id }));
//           props.history.push('/');
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// Find the expense that needs to update, access props that are passed in by HOC
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id), // if found put it to expense
});

// Pass dispatchers as props
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: data => dispatch(removeExpense(data)),
});

// React Router render HOC then passes the props through and allows to add new ones
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
