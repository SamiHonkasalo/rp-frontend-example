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
  harvesters: HarvesterType[];
}

const Map: React.FC<Props> = ({ harvesters }: Props) => {
  const classes = useStyles();
  const { state } = useContext(UIContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { sideDrawerTransitioned, themeMode } = state;

  // Create map on mount
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY || '';
    if (mapContainer && mapContainer.current) {
      const m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
      });
      setMap(m);
    }
  }, []);

  // Add all harvesters on the map
  useEffect(() => {
    if (map && map.loaded()) {
      harvesters.forEach((h) => {
        const geojsonData: mapboxgl.GeoJSONSourceOptions['data'] = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [h.location.lng, h.location.lat],
          },
          properties: {
            name: h.id,
          },
        };

        if (!map.getSource(h.id)) {
          map.addSource(h.id, {
            type: 'geojson',
            data: geojsonData,
          });
          map.addLayer({
            id: h.id,
            type: 'symbol',
            source: h.id,
            layout: {
              'icon-image': 'rocket-15',
            },
          });
          if (h.id === 'h1') {
            map.flyTo({
              center: h.location,
              speed: 0.8,
              zoom: 12,
            });
          }
        } else {
          const source: mapboxgl.GeoJSONSource = map.getSource(
            h.id
          ) as mapboxgl.GeoJSONSource;
          source.setData(geojsonData);
          if (h.id === 'h1') {
            map.flyTo({
              center: h.location,
              speed: 0.5,
            });
          }
        }
      });
    }
  }, [harvesters, map]);

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
    }
  }, [map, themeMode]);

  return <div ref={mapContainer} className={classes.map} />;
};

export default Map;
