import React from 'react';
import { Link } from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const toolBar = ({ logoutClickHandler: logout, drawerClickHandler }) => (
  <nav className="toolbar__navigation">
    <div className="toolbar__toggle-button">
      <DrawerToggleButton click={drawerClickHandler} />
    </div>
    <div className="toolbar__logo">
      <Link className="toolbar__logo-title" to="/dashboard">
        <h1>Expensify</h1>
      </Link>
    </div>
    <div className="u-center-spacer" />
    <div className="toolbar__navigation-items">
      <ul>
        <li>
          <Link className="link" to="/expense-dashboard">
            Expense
          </Link>
        </li>
        <li>
          <Link className="link" to="/income-dashboard">
            Income
          </Link>
        </li>
        <li>
          <button className="toolbar__button link" type="button" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

export default toolBar;
