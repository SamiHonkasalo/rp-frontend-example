import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

import NavList from './navigation/NavList';
import { UIContext } from '../store/ui/uiContext';
import { UITypes } from '../store/ui/uiReducer';

const useStyles = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.sideDrawer.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  list: {
    padding: 0,
  },
}));

const SideDrawer: React.FC = () => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { state, dispatch } = useContext(UIContext);

  return (
    <Drawer
      variant={isSmall ? 'temporary' : 'permanent'}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !state.sideDrawerOpen && classes.drawerPaperClose
        ),
      }}
      open={state.sideDrawerOpen}
      onClose={() => dispatch({ type: UITypes.CLOSE_SIDEDRAWER })}
      onTransitionEnd={() => dispatch({ type: UITypes.TOGGLE_TRANSITIONED })}
    >
      <div className={classes.toolbarIcon}>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          LOGO
        </Typography>
      </div>
      <Divider />
      <List className={classes.list}>
        <NavList />
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
