import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'; // eslint-disable-line

// PrivateRoute wrapper around Route Components, in order to add some conditional logic
// To determined if users are authenticated or not, rendering private components or redirecting
// destructure props is isAuthenticated, component, and the rest (i.e path, exact)
// pass props(i.e history, etc) from Route to ComponentPage, React Router DOM HOC provides
// route context to components needing access to history APIs
export const PrivateRoute = ({ isAuthenticated, component: ComponentPage, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          {/* Create instance of Component & pass props i.e history, match, etc. from Route */}
          <ComponentPage {...props} />
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
