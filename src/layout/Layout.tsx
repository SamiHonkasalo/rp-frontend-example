import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import AppBar from './AppBar';
import SideDrawer from './SideDrawer';

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

interface Props {
  themeMode: boolean;
  handleThemeSwitch: () => void;
}

const Layout = ({ themeMode, handleThemeSwitch }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const isMedium = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  // Autohide sidedrawer when medium or smaller
  useEffect(() => {
    if (isMedium) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMedium]);

  return (
    <div className={classes.root}>
      <AppBar
        themeMode={themeMode}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleThemeSwitch={handleThemeSwitch}
      />
      <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
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
                <Grid item xs={12} spacing={3}>
                  <Paper className={classes.paper}>
                    More things
                    <Grid container xs={12} spacing={3}>
                      <Grid item xs={4}>
                        <Button variant="contained">contained</Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="contained" color="primary">
                          contained primary
                        </Button>
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
      </main>
    </div>
  );
};

export default Layout;
