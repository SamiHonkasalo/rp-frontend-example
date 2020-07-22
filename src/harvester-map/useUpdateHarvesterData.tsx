import { useCallback } from 'react';

interface UpdateHarvesters {
  map: mapboxgl.Map;
  harvesters: HarvesterType[];
}

interface UpdateRoutes {
  map: mapboxgl.Map;
  harvesters: HarvesterType[];
}

const useUpdateHarvesterData = () => {
  const updateHarvesterData = useCallback(
    ({ map, harvesters }: UpdateHarvesters) => {
      const geoData: GeoJSON.FeatureCollection<
        GeoJSON.Point,
        GeoJSON.GeoJsonProperties
      > = {
        type: 'FeatureCollection',
        features: [],
      };

      if (map && map.getSource('harvesters')) {
        const source: mapboxgl.GeoJSONSource = map.getSource(
          'harvesters'
        ) as mapboxgl.GeoJSONSource;
        if (source) {
          // Loop through all harvesters and set new coords on geodata
          harvesters.forEach((h) => {
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
                description: `<strong style="color:#000;" >${h.name}</strong><p style="color:#000;" >Oil level: ${h.oilLevel}</p>`,
                icon: 'rocket',
                error: h.oilLevel < h.oilLimit,
              },
            });
            // Find the corresponding lines array and harvester feature
            const harvFeature = geoData.features.find(
              (f) => f.properties?.id === h.id
            );
            if (harvFeature) {
              const newCoords = [h.location.lng, h.location.lat];
              if (newCoords) {
                harvFeature.geometry.coordinates = newCoords;
              }
            }
          });

          // Set new data
          source.setData(geoData);
        }
      }
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
