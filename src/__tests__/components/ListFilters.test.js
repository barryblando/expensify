import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DateRangePicker } from 'react-dates';
import { ListFilters } from '../../containers/ListFilters';
import { filters, altFilters } from '../fixtures/filters';

describe('Expense List Filters', () => {
  let changeTextFilter;
  let sortDate;
  let sortAmount;
  let changeStartDate;
  let changeEndDate;
  let wrapper;

  beforeEach(() => {
    // Spies means creating fake function to make assertions on it
    // create spy for each dispatcher prop
    changeTextFilter = jest.fn();
    sortDate = jest.fn();
    sortAmount = jest.fn();
    changeStartDate = jest.fn();
    changeEndDate = jest.fn();
    wrapper = shallow(
      <ListFilters
        filters={filters}
        changeTextFilter={changeTextFilter}
        sortDate={sortDate}
        sortAmount={sortAmount}
        changeStartDate={changeStartDate}
        changeEndDate={changeEndDate}
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
    expect(changeTextFilter).toHaveBeenLastCalledWith(value);
  });

  test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
      filters: altFilters,
    });
    wrapper.find('select').simulate('change', {
      target: { value },
    });
    expect(sortDate).toHaveBeenLastCalledWith();
  });

  test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
      target: { value },
    });
    // expect sortByAmount was called
    expect(sortAmount).toHaveBeenLastCalledWith();
  });

  test('should handle date changes ', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    console.log({ startDate, endDate });
    // find DateRangePicker and its prop onDatesChange then pass startDate, endDte on it then assert
    wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
    expect(changeStartDate).toHaveBeenLastCalledWith(startDate);
    expect(changeEndDate).toHaveBeenLastCalledWith(endDate);
  });

  test('should handle date changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  });
});
