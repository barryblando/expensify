import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { ISO_DATE_FORMAT, CURRENCY_FORMAT } from '../constants';

const ListItem = ({ id, description, amount, createdAt, pathLink }) => (
  <Link className="list-item" to={`/${pathLink}/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format(ISO_DATE_FORMAT)}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format(CURRENCY_FORMAT)}</h3>
  </Link>
);

export default ListItem;
