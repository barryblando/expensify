import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../redux/actions/filters';
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
    const { changeStartDate, changeEndDate } = this.props;
    changeStartDate(startDate);
    changeEndDate(endDate);
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
    const { changeTextFilter } = this.props;
    changeTextFilter(e.target.value);
  };

  // ------------------------------------
  // ON SORT CHANGE HANDLER
  // ------------------------------------
  onSortChange = e => {
    const { sortDate, sortAmount } = this.props;
    if (e.target.value === 'date') {
      sortDate();
    } else if (e.target.value === 'amount') {
      sortAmount();
    }
  };

  render() {
    const { startDateId, endDateId, filters } = this.props;
    const { calendarFocused } = this.state;
    return (
      <div className="content-container">
        {/* CONTROLLED INPUTS */}
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search"
              value={filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select className="select" value={filters.sortBy} onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={filters.startDate}
              startDateId={startDateId}
              endDate={filters.endDate}
              endDateId={endDateId}
              onDatesChange={this.onDatesChange}
              focusedInput={calendarFocused}
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
  changeTextFilter: text => dispatch(setTextFilter(text)),
  sortDate: () => dispatch(sortByDate()),
  sortAmount: () => dispatch(sortByAmount()),
  changeStartDate: startDate => dispatch(setStartDate(startDate)),
  changeEndDate: endDate => dispatch(setEndDate(endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListFilters);
