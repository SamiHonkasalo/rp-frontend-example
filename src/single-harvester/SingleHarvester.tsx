import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HarvesterItem from './HarvesterItem';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    margin: 'auto',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
}));

const SingleHarvester = () => {
  const classes = useStyles();
  const { id } = useParams();
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setSelectedHarvester } = harvContext;

  const SEL_HARV = harvesters.find((h) => h.id === id);

  return (
    <div className={classes.container}>
      {SEL_HARV ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <HarvesterItem harvester={SEL_HARV} />
          </Grid>
        </Grid>
      ) : (
        'Harvester not found'
      )}
    </div>
  );
};

export default SingleHarvester;
