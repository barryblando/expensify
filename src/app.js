import React from 'react';
import ReactDOM from 'react-dom';
// Hot Module Replacement
import { hot } from 'react-hot-loader';
// App, Style, Reset
import 'normalize.css/normalize.css';
import './styles/style.scss';

 // render IndecisionApp & its Components & sub Components to REACT DOM
ReactDOM.render(<p>BoilerPlate</p>, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

export default hot(module)(<p>BoilerPlate</p>); // for React hot loader