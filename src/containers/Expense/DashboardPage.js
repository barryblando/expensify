import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import ExpensesSummary from '../../components/Summary';
import Lists from '../../components/List';
import Pagination from '../../components/Pagination/Pagination';

// container
import ListFilters from '../ListFilters'; /* eslint-disable-line */

// selectors
import { selectExpensesTotal } from '../../redux/selectors/expenses-total';
import selectExpenses from '../../redux/selectors/expenses';

// When you connect a component to redux store its reactive
// When the store changes the component gets re-rendered w/ new values
// </reference https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often
// export this unconnected Component for snapshot test case
class ExpenseDashboardPage extends Component {
  state = {
    pageOfItems: [],
  };

  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  render() {
    const { expenseCount, expensesTotal, expenses } = this.props;
    const { pageOfItems } = this.state;

    return (
      <div>
        <ExpensesSummary Total={expensesTotal} Count={expenseCount} expense />
        <ListFilters expenses="expenses" />
        <Lists expenses={pageOfItems} />
        <Pagination items={expenses} onChangePage={this.onChangePage} pageSize={5} />
      </div>
    );
  }
}

// when connected, this maps the redux store to access and pass state to component as props
const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters.expenses);
  // get the length & total of the visible expenses
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
    expenses: visibleExpenses,
  };
};

// Connect component to redux store using connect
// mapStateToProps in connect determines what information/state from the store we want our ExpenseList to access
// Implicitly Export default the Connected Component
export default connect(mapStateToProps)(ExpenseDashboardPage);
