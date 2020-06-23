import { useCallback } from 'react';
import * as turf from '@turf/turf';

interface Props {
  map: mapboxgl.Map;
  harvesters: HarvesterType[];
  oldGeoData: GeoJSON.FeatureCollection<
    GeoJSON.Point,
    GeoJSON.GeoJsonProperties
  >;
  setOldDataCb: (
    data: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
  ) => void;
}

const useUpdateHarvesterData = () => {
  const updateHarvesterData = useCallback(
    ({ map, harvesters, oldGeoData, setOldDataCb }: Props) => {
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
                    coordinates: [
                      coordinates,
                      [h.location.lng, h.location.lat],
                    ],
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
      setOldDataCb(geoData);
      // setOldGeoData(geoData);

      // Counter for coordinate/animation updates
      let counter = 0;
      // Function that updates the position of the harvesters
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
          requestAnimationFrame(animateMarker);
        }
        counter += 1;
      };
      animateMarker();
    },
    []
  );
  return updateHarvesterData;
};

export default useUpdateHarvesterData;
