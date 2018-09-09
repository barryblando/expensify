import React from 'react';

const drawerToggleButton = ({ click }) => (
  <button type="button" className="toggle-button" onClick={click}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>
);

export default drawerToggleButton;
