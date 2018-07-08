import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

export const Header = ({ startLogout: logout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <div className="header__navigation">
          <Link className="button button--expense" to="/expense-dashboard">
            Expense
          </Link>
          <Link className="button button--income" to="/income-dashboard">
            Income
          </Link>
          <button className="button button--logout" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);