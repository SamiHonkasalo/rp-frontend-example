/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HarvesterItem from './HarvesterItem';
import HarvesterGraph from './HarvesterGraph';
import useHttpClient from '../utils/hooks/useHttpClient';

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
  const history = useHistory();
  const { id } = useParams();
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setSelectedHarvester } = harvContext;
  const { sendRequest } = useHttpClient();
  const [harvesterData, setHarvesterData] = useState<HarvesterType>();
  const [fetchDone, setFetchDone] = useState(false);

  const SEL_HARV = harvesters.find((h) => h.id === id);

  // Get harvester regional data on mount
  useEffect(() => {
    async function getHarvesterLocation(location: LocationType) {
      try {
        const res = await sendRequest({
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            location.lng
          },${location.lat}.json/?accesss_token=${
            process.env.REACT_APP_MAP_API_KEY || ''
          }`,
        });
        // Find the region data
        let region = 'Unknown region';
        if (
          res &&
          res.features &&
          Array.isArray(res.features) &&
          res.features.length > 0
        ) {
          const { features } = res;
          features.forEach((f: any) => {
            if (typeof f.id === 'string' && f.id.includes('region')) {
              region = f?.place_name || 'Unknown region';
            }
          });
        }
        if (SEL_HARV) {
          setHarvesterData({ ...SEL_HARV, region });
        }
      } catch (e) {
        if (SEL_HARV) {
          setHarvesterData({ ...SEL_HARV });
        }
      }
    }
    if (SEL_HARV && !fetchDone) {
      getHarvesterLocation(SEL_HARV.location);
      setFetchDone(true);
    }
  }, [SEL_HARV, fetchDone, harvesterData, sendRequest]);

  const handleButtonClick = (harvId: string) => {
    setSelectedHarvester(harvId);
    history.push('/');
  };

  return (
    <div className={classes.container}>
      {harvesterData ? (
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12} md={8}>
            <HarvesterItem
              harvester={harvesterData}
              handleButtonClick={handleButtonClick}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <HarvesterGraph harvester={harvesterData} />
          </Grid>
        </Grid>
      ) : (
        'Harvester not found'
      )}
    </div>
  );
};

export default SingleHarvester;
