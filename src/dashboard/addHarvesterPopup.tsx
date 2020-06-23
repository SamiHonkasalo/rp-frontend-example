import mapboxgl from 'mapbox-gl';

const addHarvesterPopup = (map: mapboxgl.Map) => {
  const m = map;
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
};

export default addHarvesterPopup;
