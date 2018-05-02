import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
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

/* exact prop is for exact path only e.g first route, otherwise it will render on every page that starts with "/" */
const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={ ExpenseDashboardPage } exact={ true } />
      <Route path="/create" component={ AddExpensePage } />
      <Route path="/edit" component={ EditExpensePage } />
      <Route path="/help" component={ HelpPage } />
    </div>
  </BrowserRouter>
);

// render IndecisionApp & its Components & sub Components to REACT DOM
ReactDOM.render(routes, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

export default hot(module)(routes); // for React hot loader