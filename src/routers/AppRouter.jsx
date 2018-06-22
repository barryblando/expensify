import React from 'react';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';

// Hot Module Replacement
import { hot } from 'react-hot-loader'; // eslint-disable-line

// Components
import DashboardPage from '../components/DashboardPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import IncomeDashboardPage from '../components/IncomeDashboardPage';
import AddExpensePage from '../components/AddExpensePage'; // eslint-disable-line
import AddIncomePage from '../components/AddIncomePage'; // eslint-disable-line
import EditExpensePage from '../components/EditExpensePage'; // eslint-disable-line
import EditIncomePage from '../components/EditIncomePage'; // eslint-disable-line
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage'; // eslint-disable-line
import NotFoundPage from '../components/404';
import PrivateRoute from './PrivateRoute'; // eslint-disable-line
import PublicRoute from './PublicRoute'; // eslint-disable-line

/*
 * exact prop is for exact path only e.g first route, otherwise it will render on every page that starts with "/"
 * Switch is gonna stop when it found the match in Route and then render (Switch does it one at a time),
 * otherwise it will find until the very last route which doesn't have a path, which is Not Found/404.
 * component prop is where path will be targeting at
*/

export const history = createBrowserHistory();

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact />
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <PrivateRoute path="/expense-dashboard" component={ExpenseDashboardPage} />
      <PrivateRoute path="/income-dashboard" component={IncomeDashboardPage} />
      <PrivateRoute path="/create-expense" component={AddExpensePage} />
      <PrivateRoute path="/create-income" component={AddIncomePage} />
      {/* This is the same as express routes, :id will be pass as props.match.params key in EditExpensePage dynamically */}
      <PrivateRoute path="/edit-expense/:id" component={EditExpensePage} />
      <PrivateRoute path="/edit-income/:id" component={EditIncomePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </ConnectedRouter>
);

export default hot(module)(AppRouter);
