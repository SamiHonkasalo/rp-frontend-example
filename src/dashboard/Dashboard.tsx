import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';
import { HarvesterContext } from '../store/harvester/harvesterContext';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    overflow: 'auto',
    margin: 'auto',
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const harvContext = useContext(HarvesterContext);
  const { harvesters } = harvContext;
  return (
    <div className={classes.container}>
      <Map harvesters={harvesters} />
    </div>
  );
};

export default Dashboard;
