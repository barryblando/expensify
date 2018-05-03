import React from 'react';
import ReactDOM from 'react-dom';
// Hot Module Replacement
import { hot } from 'react-hot-loader';
// App, Style, Reset
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/style.scss';

// render App & its Components & sub Components to REACT DOM
ReactDOM.render(<AppRouter />, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

export default hot(module)(AppRouter); // for React hot loader