import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { ISO_DATE_FORMAT, CURRENCY_FORMAT } from '../constants';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount / 100).format(CURRENCY_FORMAT)}
      -
      {moment(createdAt).format(ISO_DATE_FORMAT)}
    </p>
  </div>
);

export default ExpenseListItem;
