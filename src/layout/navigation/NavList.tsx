import React, { useContext } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import NavItem from './NavItem';
import { AuthContext } from '../../store/auth/authContext';
import LogoutButton from '../../auth/LogoutButton';

const NavList: React.FC = () => {
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  return (
    <>
      {!isLoggedIn ? (
        <NavItem to="/login" icon={<LockOutlinedIcon />} primaryText="Login" />
      ) : (
        <LogoutButton handleLogout={logout} username={username} />
      )}
      <NavItem to="/" icon={<DashboardIcon />} primaryText="Harvester map" />
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
