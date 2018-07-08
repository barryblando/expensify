// ------------------------------------------
// SELECT TOTAL EXPENSES
// ------------------------------------------

// if length is 0 return 0 otherwise return an array of mapped expense amount then reduce it
export const selectExpensesTotal = (expenses = []) =>
  expenses.map(expense => expense.amount).reduce((sum, value) => sum + value, 0);
