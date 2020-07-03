import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import NavItem from './NavItem';

const NavList: React.FC = () => {
  return (
    <>
      <NavItem to="/login" icon={<LockOutlinedIcon />} primaryText="Login" />
      <NavItem to="/" icon={<DashboardIcon />} primaryText="Dashboard" />
      <NavItem
        to="/harvesters"
        icon={<AssignmentIcon />}
        primaryText="Harvester list"
        exact={false}
      />
    </>
  );
};

export default NavList;
