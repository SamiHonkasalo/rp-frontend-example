import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import mapboxgl from 'mapbox-gl';

import { UIContext } from '../store/ui/uiContext';

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '100%',
  },
}));

interface Props {
  center: mapboxgl.LngLatLike;
  zoom: number;
}

const Map: React.FC<Props> = ({ center, zoom }: Props) => {
  const classes = useStyles();
  const { state } = useContext(UIContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { sideDrawerOpen } = state;
  const { themeMode } = state;

  // Resize the map when sidedrawer state changes and it's not temporary
  useEffect(() => {
    if (map && !isSmall && (sideDrawerOpen || !sideDrawerOpen)) {
      // Have to use a delay due to a transition delay on the sidedrawer
      setTimeout(() => {
        map.resize();
      }, 250);
    }
  }, [map, sideDrawerOpen, isSmall]);

  // Set map to dark mode if current mode is dark
  useEffect(() => {
    if (map && themeMode) {
      map.setStyle('mapbox://styles/mapbox/dark-v10', { diff: false });
    }
  }, [map, themeMode]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY || '';
    if (mapContainer && mapContainer.current) {
      const m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center,
        zoom,
      });
      // eslint-disable-next-line no-new
      new mapboxgl.Marker().setLngLat(center).addTo(m);
      setMap(m);
    }
  }, [center, zoom]);

  return <div ref={mapContainer} className={classes.map} />;
};

export default Map;
