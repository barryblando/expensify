import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class Form extends Component {
  // --------------------------------------------------
  // OWN STATE FOR Exp & Inc Form (Initial Values)
  // Gonna use constructor to access props for state
  // --------------------------------------------------
  constructor(props) {
    super(props);
    const isProp = props.expense ? 'expense' : 'income';
    this.state = {
      // if props expense/income exist then use the current data that passed down otherwise use default
      description: props[isProp] ? props[isProp].description : '',
      note: props[isProp] ? props[isProp].note : '',
      amount: props[isProp] ? (props[isProp].amount / 100).toString() : '',
      createdAt: props[isProp] ? moment(props[isProp].createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }

  // ------------------------------------
  // DESCRIPTION HANDLER
  // ------------------------------------
  onDescriptionChange = e => {
    e.persist();
    this.setState(() => ({ description: e.target.value }));
  };

  // ------------------------------------
  // NOTES HANDLER (OPTIONAL)
  // ------------------------------------
  onNoteChange = e => {
    const note = e.target.value; // P.S put value in variable 'cause it doesn't work when tossing it on callback otherwise use e.persist
    this.setState(() => ({ note })); // <- callback
  };

  // ------------------------------------
  // AMOUNT HANDLER
  // ------------------------------------
  onAmountChange = e => {
    const amount = e.target.value;
    // regexp doesn't match empty string so in order to clear input value 'gonna add something upfront
    // if there's no amount or the amount that is provided is a match then actually set it
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  // ------------------------------------
  // DATE HANDLERS
  // ------------------------------------
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  // focused property object is either true or false
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  // ------------------------------------
  // SUBMIT HANDLER
  // ------------------------------------
  onSubmit = e => {
    e.preventDefault(); // prevent full page refresh
    const { description, amount, createdAt, note } = this.state;
    const { onSubmit } = this.props;
    // check if there's no description & amount then set error
    if (!description || !amount) {
      this.setState(() => ({ error: 'Please provide description and amount' }));
    } else {
      this.setState(() => ({ error: '' }));
      // Pass data back to Component that uses Form (Add & Edit Income or Add & Edit Expense) in order to dispatch
      onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note,
      });
    }
  };

  // ------------------------------------
  // RENDER COMPONENTS
  // ------------------------------------
  render() {
    const { description, amount, createdAt, note, error, calendarFocused } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {error && <p className="form__error">{error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus // eslint-disable-line
          className="text-input"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input type="text" placeholder="Amount" className="text-input" value={amount} onChange={this.onAmountChange} />
        <SingleDatePicker
          date={createdAt}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea placeholder="Add a note (optional)" className="textarea" value={note} onChange={this.onNoteChange} />
        <div>
          <button className="button button--add" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
