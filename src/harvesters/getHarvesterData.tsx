import { useContext, useEffect, useState } from 'react';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HARVESTER_DATA from './harvesterData';

function useHarvesters() {
  const [updateCount, setUpdateCount] = useState(0);
  const [maxReached, setMaxReached] = useState(false);
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setHarvesters } = harvContext;

  useEffect(() => {
    setHarvesters(HARVESTER_DATA);
  }, [setHarvesters]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (updateCount < 10 && !maxReached) {
        if (updateCount === 9) {
          setMaxReached(true);
        }
        setUpdateCount((prevCount) => prevCount + 1);
      } else {
        if (updateCount === 1) {
          setMaxReached(false);
        }
        setUpdateCount((prevCount) => prevCount - 1);
      }
      const newHarvesters = harvesters.map((h) => {
        if (updateCount < 10 && !maxReached) {
          return {
            ...h,
            location: {
              lat: h.location.lat + 0.01,
              lng: h.location.lng + 0.01,
            },
          };
        }
        return {
          ...h,
          location: {
            lat: h.location.lat - 0.01,
            lng: h.location.lng - 0.01,
          },
        };
      });

      setHarvesters(newHarvesters);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [harvesters, maxReached, setHarvesters, updateCount]);
}

export default useHarvesters;
