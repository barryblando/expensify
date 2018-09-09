import React from 'react';
import { Link } from 'react-router-dom';

const sideDrawer = ({ logoutClickHandler: logout, show }) => {
  let drawerClasses = 'side-drawer';

  // if show add class selector open
  if (show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
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
    </nav>
  );
};

export default sideDrawer;
