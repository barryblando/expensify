import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'; // import default style for date picker

export default class ExpenseForm extends React.Component {
  // --------------------------------------------
  // OWN STATE FOR ExpenseForm (Initial Values)
  // --------------------------------------------
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
  };

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
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  // ------------------------------------
  // DATES HANDLER
  // ------------------------------------
  onDateChange = createdAt => {
    this.setState(() => ({ createdAt }));
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  // ------------------------------------
  // RENDER COMPONENTS
  // ------------------------------------
  render() {
    return (
      <div>
        <form action="">
          <input
            type="text"
            placeholder="Description"
            autoFocus // eslint-disable-line
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
