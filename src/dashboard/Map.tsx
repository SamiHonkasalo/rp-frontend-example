import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import { UIContext } from '../store/ui/uiContext';

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

      m.on('load', () => {
        // Create source and layer for harvesters
        m.addSource('harvesters', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
        if (!m.getLayer('harvesters')) {
          m.addLayer({
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
      });

      // Add a popup on the map
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      m.on(
        'mouseenter',
        'harvesters',
        (
          e: mapboxgl.MapMouseEvent & {
            features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
          } & mapboxgl.EventData
        ) => {
          // Change the cursor style as a UI indicator.
          m.getCanvas().style.cursor = 'pointer';
          if (e && e.features && e.features[0] && e.features[0].geometry) {
            const { geometry } = e.features[0];
            const { coordinates } = geometry as GeoJSON.Point;
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
              .addTo(m);
          }
        }
      );
      m.on('mouseleave', 'harvesters', () => {
        m.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  }, []);

  // Update harvester data when changed
  useEffect(() => {
    // Amount of steps to be used in the animation of the movement
    const steps = 100;
    const geoData: GeoJSON.FeatureCollection<
      GeoJSON.Point,
      GeoJSON.GeoJsonProperties
    > = {
      type: 'FeatureCollection',
      features: [],
    };

    // Create routes/lines for each harvester and animate the marker based on those lines
    const lines = [] as turf.helpers.Feature<
      turf.helpers.Point,
      turf.helpers.Properties
    >[][];
    harvesters.forEach((h) => {
      const line = [] as turf.helpers.Feature<
        turf.helpers.Point,
        turf.helpers.Properties
      >[];
      const oldHarvData = oldGeoData.features.find(
        (f) => f.properties?.title === h.id
      );
      if (oldHarvData) {
        const { coordinates } = oldHarvData.geometry;
        if (coordinates) {
          // A simple line from origin to destination
          const route: turf.FeatureCollection<turf.LineString> = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [coordinates, [h.location.lng, h.location.lat]],
                },
              },
            ],
          };
          const dist = turf.lineDistance(route.features[0], {
            units: 'meters',
          });
          // Create a line between origin and target according to the step amount
          for (let i = 0; i < dist; i += dist / steps) {
            const segment = turf.along(route.features[0], i, {
              units: 'meters',
            });
            line.push(segment);
          }
        }
      }
      geoData.features.push({
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
      lines.push(line);
    });
    // Set old data to state to be used when calculating the route
    setOldGeoData(geoData);

    // Number of coordinate/animation updates
    let counter = 0;
    const animateMarker = () => {
      if (map && map.getSource('harvesters')) {
        const source: mapboxgl.GeoJSONSource = map.getSource(
          'harvesters'
        ) as mapboxgl.GeoJSONSource;
        if (source) {
          // Loop through all harvesters and update coords based on the coordinate array created by turf
          for (let i = 0; i < harvesters.length; i += 1) {
            if (
              lines.length > 0 &&
              lines[i][counter] &&
              lines[i][counter].geometry
            ) {
              const newCoords = lines[i][counter].geometry?.coordinates;
              if (newCoords) {
                geoData.features[i].geometry.coordinates = newCoords;
              }
            }
          }
          // Set new data
          source.setData(geoData);
        }
      }
      if (counter < steps) {
        // requestAnimationFrame(animateMarker);
      }
      counter += 1;
    };
    animateMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } else if (map && !themeMode) {
      map.setStyle('mapbox://styles/mapbox/outdoors-v11', { diff: false });
    }
  }, [map, themeMode]);

  return <div ref={mapContainer} className={classes.map} />;
};

export default Map;
