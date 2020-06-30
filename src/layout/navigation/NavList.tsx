import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';

import NavItem from './NavItem';

const NavList: React.FC = () => {
  return (
    <>
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
