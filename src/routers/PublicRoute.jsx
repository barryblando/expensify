import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// PublicRoute wrapper around Route Components, in order to add some conditional logic
// To determined if users are authenticated or not, redirecting or rendering public component i.e LoginPage
// destructure props is isAuthenticated, component, and the rest (i.e path, exact)
export const PublicRoute = ({ isAuthenticated, component: ComponentPage, ...rest }) => (
  <Route
    {...rest}
    component={props => (isAuthenticated ? <Redirect to="/dashboard" /> : <ComponentPage {...props} />)}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid, // flip string id to actual boolean value
});

export default connect(mapStateToProps)(PublicRoute);
