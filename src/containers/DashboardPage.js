import React from 'react';
import { connect } from 'react-redux';
import Chart from '../components/UI/Chart/Chart';

const DashboardPage = ({ expenses, incomes }) => (
  <div>
    <Chart expenses={expenses} incomes={incomes} />
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses,
  incomes: state.incomes,
});

export default connect(mapStateToProps)(DashboardPage);
