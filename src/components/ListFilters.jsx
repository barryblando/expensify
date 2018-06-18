import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { START_DATE, END_DATE } from '../constants';

// eslint-disable-next-line
export class ListFilters extends Component {
  state = {
    calendarFocused: null,
  };

  // ------------------------------------
  // ON DATES CHANGE HANDLER
  // ------------------------------------
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  // ------------------------------------
  // ON FOCUS CHANGE HANDLER
  // ------------------------------------
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  // ------------------------------------
  // ON TEXT CHANGE HANDLER
  // ------------------------------------
  onTextChange = e => {
    // We can access dispatch & component props via Connected Parent Component
    this.props.setTextFilter(e.target.value);
    // console.log(e.target.value);
  };

  // ------------------------------------
  // ON SORT CHANGE HANDLER
  // ------------------------------------
  onSortChange = e => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    const { startDateId, endDateId } = this.props;
    return (
      <div className="content-container">
        {/* CONTROLLED INPUTS */}
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
}

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
};

ListFilters.defaultProps = defaultProps;

// Access state filters
const mapStateToProps = state => ({
  filters: state.filters,
});

// Pass this dispatchers as props
const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListFilters);