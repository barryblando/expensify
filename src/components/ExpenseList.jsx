import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
// </reference https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often
// export this unconnected Component for snapshot test case
export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {/* To pass state expense. spread it out through the props in ExpenseListItem so it can be destruct */}
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Expenses</span>
        </div>
      ) : (
        props.expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)
      )}
    </div>
  </div>
);

// when connected, this maps the redux store to access and pass state to component as props
// list filtered expenses only
const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

// Connect component to redux store using Higher Order Component (i.e connect)
// mapStateToProps in connect determines what information/state from the store we want our ExpenseList to access
// Implicitly Export default the Connected Component
export default connect(mapStateToProps)(ExpenseList);

// -- HOC ? let's say WrappedComponent(i.e ExpenseList) --
// const connect = (injectedStateProp, injectedDispatchProp) => WrappedComponent => {
//   props here are values injected by other Component (e.g Router that passes down match prop)
//   const connect = props => <WrappedComponent {...injectedStateProp} {...injectedDispatchProp} {...props} />
//   return connect;
// }
