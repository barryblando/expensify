/* eslint-disable */
// Higher Order Component (HOC) - A Component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);
// ------------------------------------------=> Return the HOC
const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is info. Please dont share! </p>}
      {/* <Info {...props} /> */}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => props => (
  <div>{props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to view the info</p>}</div>
);

const AuthInfo = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);

render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
// render(<AuthInfo isAuthenticated info="There are the details" />, document.getElementById('app'));
