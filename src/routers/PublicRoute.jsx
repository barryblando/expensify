import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'; // eslint-disable-line

// PublicRoute wrapper around Route Components, in order to add some conditional logic
// To determined if users are authenticated or not, redirecting or rendering public component i.e LoginPage
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} component={props => (isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />)} />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid, // flip string id to actual boolean value
});

export default connect(mapStateToProps)(PublicRoute);
