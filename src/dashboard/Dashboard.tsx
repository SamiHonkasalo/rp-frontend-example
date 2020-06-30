import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    overflow: 'auto',
    margin: 'auto',
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Map />
    </div>
  );
};

export default Dashboard;
