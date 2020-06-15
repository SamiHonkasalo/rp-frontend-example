import React, { useEffect, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Switch, Route } from 'react-router-dom';

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
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* TESTING CONTENT */}
        <Switch>
          <Route path="/" exact />
          <Route path="/test" exact>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={fixedHeightPaper}>Test route</Paper>
                </Grid>
              </Grid>
            </Container>
          </Route>
        </Switch>
        {/* TESTING CONTENT */}
        {children}
      </main>
      <Notification />
    </div>
  );
};

export default Layout;
