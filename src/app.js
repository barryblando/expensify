import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Hot Module Replacement
import { hot } from 'react-hot-loader';
// App, Style, Reset
import 'normalize.css/normalize.css';
import './styles/style.scss';

const ExpenseDashboardPage = () => (
  <div>
    This is from my dashboard component
  </div>
);

const AddExpensePage = () => (
  <div>
    This is from my add expense component
  </div>
);

const EditExpensePage = () => (
  <div>
    This is from my edit expense component
  </div>
);

const HelpPage = () => (
  <div>
    This is from help page component
  </div>
);

const NotFoundPage = () => (
  <div>
    404!
  </div>
);

/* exact prop is for exact path only e.g first route, otherwise it will render on every page that starts with "/" */
/*
 * Switch is gonna stop when it found the match in Route and then render (Switch does it one at a time),
 * otherwise it will find until the very last route which doesn't have a path, which is Not Found/404
*/
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ ExpenseDashboardPage } exact={ true } />
      <Route path="/create" component={ AddExpensePage } />
      <Route path="/edit" component={ EditExpensePage } />
      <Route path="/help" component={ HelpPage } />
      <Route component={ NotFoundPage }/>
    </Switch>
  </BrowserRouter>
);

// render IndecisionApp & its Components & sub Components to REACT DOM
ReactDOM.render(routes, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

export default hot(module)(routes); // for React hot loader