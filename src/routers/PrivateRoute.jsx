import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'; // eslint-disable-line

// PrivateRouter wrapper around Route Components, in order to add some conditional logic
// To determined if users are authenticated or not, rendering private components or redirecting
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          {/* Create instance of Component & pass props i.e history, match, etc. from Route */}
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid, // flip string id to actual boolean value
});

export default connect(mapStateToProps)(PrivateRoute);
