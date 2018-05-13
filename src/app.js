import React from 'react';
import { render } from 'react-dom';
// Hot Module Replacement
import { hot } from 'react-hot-loader';
// App, Style, Reset
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter';
import './styles/style.scss';

// render App & its Components & sub Components to REACT DOM
render(<AppRouter />, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

export default hot(module)(AppRouter); // for React hot loader
