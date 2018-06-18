import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DateRangePicker } from 'react-dates';
import { ListFilters } from '../../components/ListFilters';
import { filters, altFilters } from '../fixtures/filters';

describe('Expense List Filters', () => {
  let setTextFilter;
  let sortByDate;
  let sortByAmount;
  let setStartDate;
  let setEndDate;
  let wrapper;

  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
      <ListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  });

  test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot(); // snapshot expense list filters
  });

  test('should render ExpenseListFilters with alt data correctly', () => {
    // change prop value of ExpenseListFilters by using setProps
    wrapper.setProps({
      filters: altFilters,
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
      target: { value },
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
  });

  test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
      filters: altFilters,
    });
    wrapper.find('select').simulate('change', {
      target: { value },
    });
    expect(sortByDate).toHaveBeenLastCalledWith();
  });

  test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
      target: { value },
    });
    // expect sortByAmount was called
    expect(sortByAmount).toHaveBeenLastCalledWith();
  });

  test('should handle date changes ', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    console.log({ startDate, endDate });
    // find DateRangePicker and its prop onDatesChange then pass startDate, endDte on it then assert
    wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  });

  test('should handle date changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  });
});
