import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from './Form';
import { startEditIncome, startRemoveIncome } from '../actions/incomes';

export class EditIncomePage extends Component {
  onSubmit = income => {
    this.props.startEditIncome(this.props.income.id, income);
    console.log('updated:', income);
    this.props.history.push('/income-dashboard');
  };

  onRemove = () => {
    this.props.startRemoveIncome({ id: this.props.income.id }); // data
    this.props.history.push('/income-dashboard');
  };

  render() {
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
          <Form income={this.props.income} onSubmit={this.onSubmit} />
          <button className="button button--remove" onClick={this.onRemove}>
            Remove Income
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  income: state.incomes.find(income => income.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditIncome: (id, income) => dispatch(startEditIncome(id, income)),
  startRemoveIncome: data => dispatch(startRemoveIncome(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditIncomePage);
