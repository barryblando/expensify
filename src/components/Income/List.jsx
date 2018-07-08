import React from 'react';
import IncomeListItem from './ListItem';

export const List = ({ incomes }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Incomes</div>
      <div className="show-for-desktop">Income</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {incomes.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Incomes</span>
        </div>
      ) : (
        incomes.map(income => <IncomeListItem {...income} key={income.id} />)
      )}
    </div>
  </div>
);

export default List;
