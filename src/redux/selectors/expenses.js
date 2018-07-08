import moment from 'moment';

// ------------------------------------------
// GET VISIBLE EXPENSES
// ------------------------------------------

// Use Selectors for Calculated State and Decoupling
// create a selector that simply exports all the variables needed to construct the view (e.g Filtering List)

export default (expenses, { text, sortBy, startDate, endDate }) =>
  // Filtering out
  expenses
    .filter(expense => {
      // Version 1.0
      // -------- LOGIC START --------
      // if startDate or endDate is a number then proceed to next condition (otherwise won't be filtered)
      // if createdAt is greater than startDate or less than endDate, do included in filter expenses (otherwise filtered out)
      // and if expenses.description has the text variable string inside of it (lowercase sensitive)
      // -------- LOGIC END --------
      // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
      // Version 2.0
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

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
