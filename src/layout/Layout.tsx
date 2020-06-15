import React, { useEffect, useContext, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppBar from './AppBar';
import SideDrawer from './SideDrawer';
import { UIContext } from '../store/ui/uiContext';
import { UITypes } from '../store/ui/uiReducer';
import Notification from '../shared/components/ui/Notification';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  main: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const isMedium = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const { dispatch } = useContext(UIContext);

  const handleDrawerOpen = useCallback(() => {
    dispatch({ type: UITypes.OPEN_SIDEDRAWER });
  }, [dispatch]);
  const handleDrawerClose = useCallback(() => {
    dispatch({ type: UITypes.CLOSE_SIDEDRAWER });
  }, [dispatch]);

  // Autohide sidedrawer when medium or smaller
  useEffect(() => {
    if (isMedium) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  }, [isMedium, handleDrawerClose, handleDrawerOpen]);

  return (
    <div className={classes.root}>
      <AppBar />
      <SideDrawer />
      <main className={classes.main}>
        <div className={classes.appBarSpacer} />
        <div className={classes.content}>{children}</div>
      </main>
      <Notification />
    </div>
  );
};

export default Layout;
