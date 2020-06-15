import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';

import useNotification from './utils/hooks/useNotification';

const useStyles = makeStyles((theme: Theme) => ({
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

const TestRoute: React.FC = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const notify = useNotification();

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
  );
};

export default TestRoute;
