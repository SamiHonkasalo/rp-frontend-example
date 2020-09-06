/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HarvesterTable from './HarvesterTable';
import HarvesterCards from './HarvesterCards';
import useHttpClient from '../utils/hooks/useHttpClient';
import useNotification from '../utils/hooks/useNotification';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    margin: 'auto',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export type RegionData = {
  id: HarvesterType['id'];
  region: HarvesterType['region'];
};

const HarvesterList = () => {
  const classes = useStyles();
  const history = useHistory();
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setSelectedHarvester } = harvContext;
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { sendRequest, loading } = useHttpClient();
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [fetchDone, setFetchDone] = useState(false);
  const notify = useNotification();

  // Get harvesters regional data on mount
  useEffect(() => {
    async function getHarvesterLocation(
      location: LocationType,
      id: HarvesterType['id']
    ) {
      try {
        const res = await sendRequest({
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            location.lng
          },${location.lat}.json/?access_token=${
            process.env.REACT_APP_MAP_API_KEY || ''
          }`,
        });
        return { id, data: res };
      } catch (e) {
        notify({
          message: `Error retrieving harvester ${id} region data: ${e.message}`,
          type: 'error',
        });
        return { id, data: null };
      }
    }
    // Get region data for each harvester
    // Only check the regions once on mount
    if (!fetchDone && harvesters.length > 0) {
      const harvesterPromises: Promise<{ id: string; data: any }>[] = [];
      harvesters.forEach((h) => {
        harvesterPromises.push(getHarvesterLocation(h.location, h.id));
      });
      setFetchDone(true);
      Promise.all(harvesterPromises).then((data) => {
        const allRegionDatas = [] as RegionData[];
        // Find the correct harvester
        data.forEach((d) => {
          // Find the region data
          let region = 'Unknown region';
          if (
            d &&
            d.data &&
            d.data.features &&
            Array.isArray(d.data.features) &&
            d.data.features.length > 0
          ) {
            const { features } = d.data;
            features.forEach((f: any) => {
              if (
                typeof f.id === 'string' &&
                f.id.includes('region') &&
                typeof f?.place_name === 'string'
              ) {
                region = f?.place_name || 'Unknown region';
              }
            });
          }
          allRegionDatas.push({ id: d.id, region });
        });
        setRegionData(allRegionDatas);
      });
    }
  }, [sendRequest, harvesters, fetchDone, notify]);

  const handleItemClick = (event: React.MouseEvent<unknown>, id: string) => {
    // Do not redirect if the button has been clicked
    if (
      event.target instanceof Element &&
      typeof event.target.className === 'string'
    ) {
      if (!event.target.className.includes('Button')) {
        history.push(`/harvesters/${id}`);
      }
    }
  };

  const handleButtonClick = (id: string) => {
    setSelectedHarvester(id);
    history.push('/');
  };

  // Attach the correct regiondata to each harvester
  const finalHarvesters = harvesters.map((h) => {
    const region =
      regionData.find((r) => r.id === h.id)?.region || 'Unknown region';
    return { ...h, region };
  });
  return (
    <div className={classes.container}>
      {isSmall ? (
        <HarvesterCards
          loading={loading}
          harvesters={finalHarvesters}
          handleCardClick={handleItemClick}
          handleButtonClick={handleButtonClick}
        />
      ) : (
        <HarvesterTable
          loading={loading}
          harvesters={finalHarvesters}
          handleRowClick={handleItemClick}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default HarvesterList;
