import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from './Form';
import { startEditIncome, startRemoveIncome } from '../actions/incomes';

export class EditIncomePage extends Component {
  onSubmit = incomeData => {
    const { EditIncome, history, income } = this.props;
    EditIncome(income.id, incomeData);
    history.push('/income-dashboard');
  };

  onRemove = () => {
    const { RemoveIncome, history, income } = this.props;
    RemoveIncome({ id: income.id }); // data
    history.push('/income-dashboard');
  };

  render() {
    const { income } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="content-container u-justify-content">
            <h1 className="page-header__title">Edit Income</h1>
            <Link className="button button--back" to="/income-dashboard">
              Back
            </Link>
          </div>
        </div>
        <div className="content-container">
          {/* Pass prop income & onSubmit to Form */}
          <Form income={income} onSubmit={this.onSubmit} />
          <button className="button button--remove" type="button" onClick={this.onRemove}>
            Remove Income
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  income: state.incomes.find(income => income.id === match.params.id),
});

const mapDispatchToProps = dispatch => ({
  EditIncome: (id, income) => dispatch(startEditIncome(id, income)),
  RemoveIncome: data => dispatch(startRemoveIncome(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditIncomePage);
