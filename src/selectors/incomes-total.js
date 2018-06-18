// ------------------------------------------
// SELECT TOTAL INCOMES
// ------------------------------------------

// if length is 0 return 0 otherwise return an array of mapped expense amount then reduce it
export const selectIncomesTotal = (incomes = []) =>
  incomes.map(income => income.amount).reduce((sum, value) => sum + value, 0);
