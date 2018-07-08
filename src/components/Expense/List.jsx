import React from 'react';
import ExpenseListItem from './ListItem';

export const List = ({ expenses }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {/* To pass state expense. spread it out through the props in ExpenseListItem so it can be destruct */}
    <div className="list-body">
      {expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Expenses</span>
        </div>
      ) : (
        expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)
      )}
    </div>
  </div>
);

export default List;
