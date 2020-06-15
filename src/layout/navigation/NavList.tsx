import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';

import NavItem from './NavItem';

const NavList: React.FC = () => {
  return (
    <>
      <NavItem to="/" icon={<DashboardIcon />} primaryText="Dashboard" />
      <NavItem to="/test" icon={<AssignmentIcon />} primaryText="Test route" />
    </>
  );
};

export default NavList;
