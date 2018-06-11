import React from 'react';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';

// Components
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage'; // eslint-disable-line
import EditExpensePage from '../components/EditExpensePage'; // eslint-disable-line
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage'; // eslint-disable-line
import NotFoundPage from '../components/404';
import PrivateRoute from './PrivateRoute'; // eslint-disable-line
import PublicRoute from './PublicRoute'; // eslint-disable-line

/*
 * exact prop is for exact path only e.g first route, otherwise it will render on every page that starts with "/"
 * Switch is gonna stop when it found the match in Route and then render (Switch does it one at a time),
 * otherwise it will find until the very last route which doesn't have a path, which is Not Found/404
*/

export const history = createHistory();

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        {/* This is the same as express routes, :id will be pass as props.match.params key in EditExpensePage dynamically */}
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default AppRouter;
