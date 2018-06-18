import React from 'react';
import { connect } from 'react-redux';
import IncomeListItem from './IncomeListItem';
import selectIncomes from '../selectors/incomes';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
// </reference https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often
// export this unconnected Component for snapshot test case
export const IncomeList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Incomes</div>
      <div className="show-for-desktop">Income</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {/* To pass state expense. spread it out through the props in ExpenseListItem so destruct is possible */}
    <div className="list-body">
      {props.incomes.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Incomes</span>
        </div>
      ) : (
        props.incomes.map(income => <IncomeListItem {...income} key={income.id} />)
      )}
    </div>
  </div>
);

// when connected this maps the redux store to access and pass state to component as props
// will use the selector expenses
const mapStateToProps = state => ({
  incomes: selectIncomes(state.incomes, state.filters),
});

// Connect component to redux store using Higher Order Component
// function in connect determines what information from the store we want our ExpenseList to be able to access
// Implicitly Export default the Connected Component
export default connect(mapStateToProps)(IncomeList);
