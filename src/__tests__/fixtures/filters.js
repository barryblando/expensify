import moment from 'moment';

const filters = {
  expenses: {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  },
  incomes: {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  },
};

const altFilters = {
  expenses: {
    text: 'Development',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
  },
  incomes: {
    text: 'Client Fees',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment(0).add(2, 'days'),
  },
};

export { filters, altFilters };
