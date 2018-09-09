import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { CURRENCY_FORMAT } from '../constants';

export const Summary = props => {
  const { Total, Count } = props;
  const formattedTotal = numeral(Total / 100).format(CURRENCY_FORMAT);
  let Word = null;
  let path = null;
  let btnText = null;

  switch (Object.keys(props)[2]) {
    case 'expense':
      Word = Count === 1 ? 'expense' : 'expenses';
      path = '/create-expense';
      btnText = 'Add Expense';
      break;
    case 'income':
      Word = Count === 1 ? 'income' : 'incomes';
      path = '/create-income';
      btnText = 'Add Income';
      break;
    default:
      path = null;
      btnText = null;
  }

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{Count}</span> {Word}, Totalling: <span>{formattedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button button--add" to={path}>
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
