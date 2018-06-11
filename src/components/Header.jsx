import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

/* NavLink for calling out specific link with more built-in props */
export const Header = props => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/dashboard" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    {/* <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink> removed. this is dynamic url for data to grab in params */}
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);
