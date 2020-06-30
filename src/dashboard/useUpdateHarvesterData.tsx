import { useCallback } from 'react';
import * as turf from '@turf/turf';

interface UpdateHarvesters {
  map: mapboxgl.Map;
  harvesters: HarvesterType[];
  oldGeoData: GeoJSON.FeatureCollection<
    GeoJSON.Point,
    GeoJSON.GeoJsonProperties
  >;
  setOldDataCb: (
    data: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
  ) => void;
  selectedHarvester: HarvesterType | null;
}

interface UpdateRoutes {
  map: mapboxgl.Map;
  harvesters: HarvesterType[];
}

interface HarvesterLine {
  id: string;
  lines: turf.helpers.Feature<turf.helpers.Point, turf.helpers.Properties>[];
}

const useUpdateHarvesterData = () => {
  const updateHarvesterData = useCallback(
    ({
      map,
      harvesters,
      oldGeoData,
      setOldDataCb,
      selectedHarvester,
    }: UpdateHarvesters) => {
      // Amount of steps to be used in the animation of the movement
      const steps = 250;
      const geoData: GeoJSON.FeatureCollection<
        GeoJSON.Point,
        GeoJSON.GeoJsonProperties
      > = {
        type: 'FeatureCollection',
        features: [],
      };

      // Create routes/lines for each harvester and animate the marker based on those lines
      const lines = [] as HarvesterLine[];
      harvesters.forEach((h) => {
        const line = [] as turf.helpers.Feature<
          turf.helpers.Point,
          turf.helpers.Properties
        >[];
        const oldHarvData = oldGeoData.features.find(
          (f) => f.properties?.id === h.id
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
          id: h.id,
          properties: {
            id: h.id,
            title: h.id,
            description: h.name,
            icon: 'rocket',
          },
        });
        lines.push({ id: h.id, lines: line });
      });
      // Set old data to state to be used when calculating the route
      setOldDataCb(geoData);

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
            harvesters.forEach((h) => {
              if (lines.length > 0) {
                // Find the corresponding lines array and harvester feature
                const harvLine = lines.find((l) => l.id === h.id);
                const harvFeature = geoData.features.find(
                  (f) => f.properties?.id === h.id
                );
                if (harvLine && harvFeature) {
                  const newCoords =
                    harvLine.lines[counter]?.geometry?.coordinates;
                  if (newCoords) {
                    harvFeature.geometry.coordinates = newCoords;
                  }
                }
              }
            });

            // Set new data
            source.setData(geoData);
            // If a harvester is selected, fly to the new harvester location
            if (selectedHarvester) {
              const selHarv = geoData.features.find(
                (f) => f.properties?.id === selectedHarvester
              );
              if (selHarv && !map.isZooming()) {
                map.flyTo({
                  center: [...selHarv.geometry.coordinates] as [number, number],
                });
              }
            }
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

  const updateHarvesterRoutes = useCallback(
    ({ map, harvesters }: UpdateRoutes) => {
      const routeData: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
        type: 'FeatureCollection',
        features: [],
      };
      // Get the routes source
      if (map && map.getSource('routes')) {
        const source: mapboxgl.GeoJSONSource = map.getSource(
          'routes'
        ) as mapboxgl.GeoJSONSource;
        if (source) {
          // Loop through all harvester routes and update them
          harvesters.forEach((h) => {
            const coords = h.route.map((r) => [r.lng, r.lat]);
            const feature: GeoJSON.Feature<
              GeoJSON.LineString,
              GeoJSON.GeoJsonProperties
            > = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords,
              },
            };
            routeData.features.push(feature);
          });
          // Set new data
          source.setData(routeData);
        }
      }
    },
    []
  );

  return { updateHarvesterData, updateHarvesterRoutes };
};

export default useUpdateHarvesterData;
