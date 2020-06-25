const onMapLoad = (m: mapboxgl.Map) => {
  // Create source and layer for harvesters
  if (!m.getSource('harvesters')) {
    m.addSource('harvesters', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }
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
};

export default onMapLoad;
