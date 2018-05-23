import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { START_DATE, END_DATE } from '../constants';

// eslint-disable-next-line
class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  // ------------------------------------
  // ON DATES CHANGE HANDLER
  // ------------------------------------
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  // ------------------------------------
  // ON FOCUS CHANGE HANDLER
  // ------------------------------------
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    const { startDateId, endDateId } = this.props;
    return (
      <div>
        {/* CONTROLLED INPUTS */}
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            // We can access dispatch & component props via Connected Parent Component
            this.props.dispatch(setTextFilter(e.target.value));
            // console.log(e.target.value);
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={e => {
            if (e.target.value === 'date') {
              this.props.dispatch(sortByDate());
            } else if (e.target.value === 'amount') {
              this.props.dispatch(sortByAmount());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId={startDateId}
          endDate={this.props.filters.endDate}
          endDateId={endDateId}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
};

ExpenseListFilters.defaultProps = defaultProps;

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
