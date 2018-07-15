import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

import ToolBar from '../components/Toolbar/ToolBar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import BackDrop from '../components/Backdrop/BackDrop';

export class Header extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    // good practice use prevState when toggling state
    this.setState(prevState => ({
      sideDrawerOpen: !prevState.sideDrawerOpen,
    }));
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    const { startLogout: logout } = this.props;
    const { sideDrawerOpen } = this.state;

    let backdrop;

    if (sideDrawerOpen) {
      backdrop = <BackDrop closeHandler={this.backdropClickHandler} />;
    }

    return (
      <header className="toolbar">
        <div className="content-container">
          <ToolBar drawerClickHandler={this.drawerToggleClickHandler} logoutClickHandler={logout} />
          <SideDrawer logoutClickHandler={logout} show={sideDrawerOpen} />
          {backdrop}
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);
