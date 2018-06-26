import loadable from 'react-loadable';
import LoadingPage from '../components/LoadingPage';

// Expense Dashboard Page route Component
const ExpenseDashboardPagePromise = () => import('../components/ExpenseDashboardPage');
const IncomeDashboardPagePromise = () => import('../components/IncomeDashboardPage');

export const AsyncExpenseDashboardPage = loadable({
  loader: ExpenseDashboardPagePromise,
  loading: LoadingPage,
});

export const AsyncIncomeDashboardPage = loadable({
  loader: IncomeDashboardPagePromise,
  loading: LoadingPage,
});
