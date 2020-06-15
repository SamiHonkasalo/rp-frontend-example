import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Map from './Map';

const useStyles = makeStyles((theme: Theme) => ({
  appBarShift: theme.mixins.toolbar,
  container: {
    height: '100%',
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Map center={{ lat: 62.2518079, lng: 25.7671327 }} zoom={12} />
    </Container>
  );
};

export default Dashboard;
