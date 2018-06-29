import React from 'react';
import { connect } from 'react-redux';
import IncomeListItem from './IncomeListItem';
import selectIncomes from '../selectors/incomes';

export const IncomeList = ({ incomes }) => (
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

const mapStateToProps = state => ({
  incomes: selectIncomes(state.incomes, state.filters),
});

export default connect(mapStateToProps)(IncomeList);
