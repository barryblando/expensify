import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/404';
import Header from '../components/Header';

/*
 * exact prop is for exact path only e.g first route, otherwise it will render on every page that starts with "/"
 * Switch is gonna stop when it found the match in Route and then render (Switch does it one at a time),
 * otherwise it will find until the very last route which doesn't have a path, which is Not Found/404
*/
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact />
        <Route path="/create" component={AddExpensePage} />
        {/* This is the same as express routes, :id will be pass as props.match.params key in EditExpensePage dynamically */}
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
