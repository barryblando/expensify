import React from 'react';
import ListItem from './ListItem';

export const List = props => {
  let defaultTxt = null;
  let desktopTxt = null;
  let path = null;
  let rawData = null;

  console.log('[List] props: ', props[Object.keys(props)[0]]);

  switch (Object.keys(props)[0]) {
    case 'expenses':
      defaultTxt = 'Expenses';
      desktopTxt = 'Expense';
      path = 'edit-expense';
      rawData = props.expenses;
      break;
    case 'incomes':
      defaultTxt = 'Incomes';
      desktopTxt = 'Income';
      path = 'edit-income';
      rawData = props.incomes;
      break;
    default:
      defaultTxt = null;
      desktopTxt = null;
      path = null;
      rawData = null;
  }

  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">{defaultTxt}</div>
        <div className="show-for-desktop">{desktopTxt}</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      {/* To pass state expense. spread it out through the props in ExpenseListItem so it can be destruct */}
      <div className="list-body">
        {rawData.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No {defaultTxt}</span>
          </div>
        ) : (
          rawData.map(data => <ListItem {...data} key={data.id} pathLink={path} />)
        )}
      </div>
    </div>
  );
};

export default List;
