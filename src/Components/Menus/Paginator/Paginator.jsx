import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "./Paginator.css"
import { colors } from '@material-ui/core';

export default function Paginator() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Button-container">
      <div className="buttonMenu">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <div className="button-text">Open Menu</div>
        </Button>
      </div>
      <div className="empty-div"></div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="menuItem">
          <MenuItem onClick={handleClose}>Összes</MenuItem>
          <MenuItem onClick={handleClose}>Főétel</MenuItem>
          <MenuItem onClick={handleClose}>Desszert</MenuItem>
        </div>
      </Menu>
    </div>
  );
}