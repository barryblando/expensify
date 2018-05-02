import React from 'react';
import ReactDOM from 'react-dom';
// HMR
import { hot } from 'react-hot-loader';

// App
import IndecisionApp from './components/IndecisionApp';

const Layout = () => {
  return (
    <div>
      <p>Header</p>
      { props.children }
      <p>Footer</p>
    </div>
  );
};

ReactDOM.render((
  <Layout>
    <div>
      <h1>Page Title</h1>
      <p>This is my Page</p>
    </div>
  </Layout>
), document.getElementById('app')); // render IndecisionApp & its Components & sub Components to REACT DOM
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));

/**
 * Passing children props when using third party components like integrating modal or date picker to an app,
 */