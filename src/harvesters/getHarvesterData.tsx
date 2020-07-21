import { useContext, useEffect } from 'react';

import { HarvesterContext } from '../store/harvester/harvesterContext';
import HARVESTER_DATA from './harvesterData';

function useHarvesters() {
  const harvContext = useContext(HarvesterContext);
  const { harvesters, setHarvesters } = harvContext;

  useEffect(() => {
    setHarvesters(HARVESTER_DATA);
  }, [setHarvesters]);

  useEffect(() => {
    const randomNum = (min = 0.0005, max = 0.002) => {
      const rand = parseFloat((Math.random() * (max - min) + min).toFixed(4));
      const fct = Math.round(Math.random()) ? 1 : -1;
      return rand * fct;
    };

    const interval = setInterval(() => {
      const newHarvesters = harvesters.map((h) => {
        // Create a new location from random numbers
        const newLocation = {
          lat: h.location.lat + randomNum(),
          lng: h.location.lng + randomNum(),
        };
        // Set the new location and create the route array
        const curRoute = [...h.route];
        if (curRoute.length >= 20) {
          curRoute.length = 19;
        }
        curRoute.unshift(newLocation);

        // Also set the oil level history and change the oil level
        const curOilLevel = h.oilLevel;
        const curHistory = [...h.oilLevelHistory];
        if (curHistory.length >= 50) {
          curHistory.length = 49;
        }
        const newMeas: OilLevelHistoryType = {
          time: new Date(),
          value: curOilLevel,
        };
        curHistory.unshift(newMeas);
        return {
          ...h,
          location: newLocation,
          oilLevel: parseFloat((curOilLevel + randomNum(0.5, 2)).toFixed(1)),
          route: [...curRoute],
          oilLevelHistory: [...curHistory],
        };
      });
      setHarvesters(newHarvesters);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [harvesters, setHarvesters]);
}

export default useHarvesters;
