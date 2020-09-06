import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import mapboxgl from 'mapbox-gl';

import { UIContext } from '../store/ui/uiContext';
import onMapLoad from './onMapLoad';
import addHarvesterPopup from './addHarvesterPopup';
import useUpdateHarvesterData from './useUpdateHarvesterData';
import HarvesterSelect from './HarvesterSelect';
import { HarvesterContext } from '../store/harvester/harvesterContext';

const useStyles = makeStyles(() => ({
  map: {
    margin: 'auto',
    width: '100%',
    height: '100%',
  },
}));

const Map: React.FC = () => {
  const classes = useStyles();
  const { state } = useContext(UIContext);
  const harvContext = useContext(HarvesterContext);
  const { harvesters, selectedHarvester, setSelectedHarvester } = harvContext;
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [prevSelected, setPrevSelected] = useState('');

  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { sideDrawerTransitioned, themeMode } = state;

  const {
    updateHarvesterData,
    updateHarvesterRoutes,
  } = useUpdateHarvesterData();

  // Create map on mount
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY || '';
    if (mapContainer && mapContainer.current) {
      const m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 6,
        center: { lat: 62.2518079, lng: 25.7671327 },
      });
      setMap(m);
    }
  }, []);

  // Update harvester and route data when changed
  useEffect(() => {
    if (map) {
      updateHarvesterData({
        map,
        harvesters,
      });
      updateHarvesterRoutes({ map, harvesters });
    }
  }, [harvesters, map, updateHarvesterData, updateHarvesterRoutes]);

  // Fly to selected harvester when selection/location changes
  useEffect(() => {
    const selHarv = harvesters.find((h) => h.id === selectedHarvester);
    if (map && selHarv && !map.isZooming()) {
      map.flyTo({
        center: selHarv.location,
        zoom: 14,
        speed:
          map.getZoom() === 14 && selectedHarvester === prevSelected
            ? 0.02
            : 1.42,
      });
      if (selectedHarvester !== prevSelected) {
        setPrevSelected(selectedHarvester);
      }
    }
  }, [map, harvesters, selectedHarvester, prevSelected]);

  // Resize the map when sidedrawer state changes (transition is over) and it's not temporary
  useEffect(() => {
    if (map && !isSmall) {
      map.resize();
    }
  }, [map, sideDrawerTransitioned, isSmall]);

  // Set map to dark mode if current mode is dark
  useEffect(() => {
    if (map && themeMode) {
      map.setStyle('mapbox://styles/mapbox/dark-v10', { diff: false });
    } else if (map && !themeMode) {
      map.setStyle('mapbox://styles/mapbox/outdoors-v11', { diff: false });
    }
    if (map) {
      // Create source and layer for harvesters on map style load
      map.on('style.load', () => {
        onMapLoad(map);
        map.setPaintProperty(
          'harvesters',
          'text-color',
          themeMode ? '#fff' : '#000'
        );
        // Add a popup on the map for both normal and error layer
        addHarvesterPopup(map, 'harvesters');
        addHarvesterPopup(map, 'harvesters-error');
      });
    }
  }, [map, themeMode]);

  const handleSelectedChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const val = event.target.value as string;
    setSelectedHarvester(val);
  };

  return (
    <div ref={mapContainer} className={`${classes.map} mapboxgl-map`}>
      <HarvesterSelect
        harvesters={harvesters}
        handleSelectedChange={handleSelectedChange}
        selectedHarvester={selectedHarvester}
      />
    </div>
  );
};

export default Map;
