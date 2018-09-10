import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

import ToolBar from '../components/ToolBar/ToolBar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import BackDrop from '../components/BackDrop/BackDrop';

export class Header extends Component {
  state = {
    sideDrawerOpen: false,
  };

  // -- Handle hamburger menu open SideDrawer --
  drawerToggleClickHandler = () => {
    // good practice use prevState when toggling state
    this.setState(prevState => ({
      sideDrawerOpen: !prevState.sideDrawerOpen,
    }));
  };

  // -- Handle backdrop close SideDrawer --
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    const { startLogout: logout } = this.props;
    const { sideDrawerOpen } = this.state;

    let backdrop;

    // if true then add BackDrop behind SideDrawer
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
