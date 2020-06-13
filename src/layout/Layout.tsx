import React, { useEffect, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import AppBar from './AppBar';
import SideDrawer from './SideDrawer';
import { UIContext } from '../store/ui/uiContext';
import { UITypes } from '../store/ui/uiReducer';
import Notification from '../shared/components/ui/Notification';
import useNotification from '../utils/hooks/useNotification';

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
  const notify = useNotification();

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

  // TEST FUNCTION FOR NOTIFICATIONS
  const handleNotificationTest = () => {
    notify({ message: 'Test notification #1 - normal/info' });
    notify({
      message: 'Test notification #2 - warning',
      type: 'warning',
      hideDuration: 5000,
    });
    notify({
      message: 'Test notification #3 - error',
      type: 'error',
      hideDuration: 2000,
    });
  };

  return (
    <div className={classes.root}>
      <AppBar />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* TESTING CONTENT */}
        <Switch>
          <Route path="/" exact>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>Things</Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>Other things</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    More things
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Button variant="contained">contained</Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Fab color="secondary" aria-label="remove">
                          <RemoveIcon />
                        </Fab>
                        <Button variant="contained" color="primary">
                          contained primary
                        </Button>
                        <Fab
                          color="primary"
                          aria-label="add"
                          onClick={handleNotificationTest}
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="contained" color="secondary">
                          contained secondary
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="outlined">outlined</Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="outlined" color="primary">
                          outlined primary
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="outlined" color="secondary">
                          outlined secondary
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Box pt={4}>And even more...</Box>
            </Container>
          </Route>
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
