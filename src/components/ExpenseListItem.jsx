import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>
      {amount} - {createdAt}
    </p>
    <button
      onClick={() => {
        dispatch(removeExpense({ id }));
      }}
    >
      Remove
    </button>
  </div>
);

// no state, Just access the dispatch via connect
export default connect()(ExpenseListItem);
