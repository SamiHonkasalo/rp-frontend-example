import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import mapboxgl from 'mapbox-gl';

import { UIContext } from '../store/ui/uiContext';
import onMapLoad from './onMapLoad';
import addHarvesterPopup from './addHarvesterPopup';
import useUpdateHarvesterData from './useUpdateHarvesterData';

const useStyles = makeStyles(() => ({
  map: {
    margin: 'auto',
    width: '100%',
    height: '100%',
  },
}));
interface Props {
  harvesters: HarvesterType[];
}

const Map: React.FC<Props> = ({ harvesters }: Props) => {
  const classes = useStyles();
  const { state } = useContext(UIContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [oldGeoData, setOldGeoData] = useState<
    GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
  >({
    type: 'FeatureCollection',
    features: [],
  });
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { sideDrawerTransitioned, themeMode } = state;

  const updateHarvesterData = useUpdateHarvesterData();

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

      // Create source and layer for harvesters on map load
      m.on('load', () => {
        onMapLoad(m);
      });

      // Add a popup on the map
      addHarvesterPopup(m);
    }
  }, []);

  const handleOldData = (
    oldData: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
  ) => {
    setOldGeoData(oldData);
  };

  // Update harvester data when changed
  useEffect(() => {
    if (map) {
      updateHarvesterData({
        map,
        harvesters,
        oldGeoData,
        setOldDataCb: handleOldData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harvesters, map, updateHarvesterData]);

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
  }, [map, themeMode]);

  return <div ref={mapContainer} className={`${classes.map} mapboxgl-map`} />;
};

export default Map;
