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

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  if (map) {
    map.on(
      'mouseenter',
      'harvesters',
      (
        e: mapboxgl.MapMouseEvent & {
          features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
        } & mapboxgl.EventData
      ) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        if (e && e.features && e.features[0] && e.features[0].geometry) {
          const { geometry } = e.features[0];
          const { coordinates } = (geometry as unknown) as GeoJSON.Point;
          const { description } = e.features[0].properties as {
            description: string;
          };

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat({ lat: coordinates[1], lng: coordinates[0] })
            .setHTML(description)
            .addTo(map);
        }
      }
    );
    map.on('mouseleave', 'harvesters', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }

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

  // Add all harvesters to the map
  useEffect(() => {
    if (map && map.loaded()) {
      // Create a feature collection of harvesters
      const geojsonData: mapboxgl.GeoJSONSourceOptions['data'] = {
        type: 'FeatureCollection',
        features: [],
      };
      harvesters.forEach((h) => {
        geojsonData.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [h.location.lng, h.location.lat],
          },
          properties: {
            title: h.id,
            description: `Harvester ${h.id}`,
            icon: 'rocket',
          },
        });
      });
      // If source and layer do not exist, add them, else update the source data
      if (!map.getSource('harvesters')) {
        map.addSource('harvesters', {
          type: 'geojson',
          data: geojsonData,
        });
        if (!map.getLayer('harvesters')) {
          map.addLayer({
            id: 'harvesters',
            type: 'symbol',
            source: 'harvesters',
            layout: {
              // get the icon name from the source's "icon" property
              // concatenate the name to get an icon from the style's sprite sheet
              'icon-image': ['concat', ['get', 'icon'], '-15'],
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top',
            },
          });
        }
      } else {
        const source: mapboxgl.GeoJSONSource = map.getSource(
          'harvesters'
        ) as mapboxgl.GeoJSONSource;
        source.setData(geojsonData);
      }
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
