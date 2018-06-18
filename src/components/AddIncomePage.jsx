import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from './Form';
import { startAddIncome } from '../actions/incomes';

// export the unconnected component for Testing
export class AddIncomePage extends Component {
  onSubmit = income => {
    this.props.startAddIncome(income);
    // go back to dashboard by Accessing props from react router
    this.props.history.push('/income-dashboard');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Add Income</h1>
            <Link className="button button--back" to="/income-dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass prop onSubmit to Form */}
          <Form onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

// pass this dispatcher as prop on AddExpensePage
// This is the way to return dispatcher function, allowing to obstruct them away from the component itself
const mapDispatchToProps = dispatch => ({
  startAddIncome: income => dispatch(startAddIncome(income)),
});

// set mapStateToProps to undefined 'cause we're not using it
export default connect(
  undefined,
  mapDispatchToProps
)(AddIncomePage);
