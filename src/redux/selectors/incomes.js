import moment from 'moment';

// ------------------------------------------
// GET VISIBLE INCOMES
// ------------------------------------------

export default (incomes, { text, sortBy, startDate, endDate }) =>
  incomes
    .filter(income => {
      const createdAtMoment = moment(income.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = income.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      let sortedValue;
      if (sortBy === 'date') {
        // <reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        sortedValue = a.createdAt < b.createdAt ? 1 : -1; // if true return b/1 else a/-1
      } else if (sortBy === 'amount') {
        sortedValue = a.amount < b.amount ? 1 : -1;
      }
      return sortedValue;
    });
