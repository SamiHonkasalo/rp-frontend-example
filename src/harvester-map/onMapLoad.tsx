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
      filter: ['!=', ['get', 'error'], true],
    });
  }
  // Also add a layer for error harvesters
  if (!m.getLayer('harvesters-error')) {
    m.addLayer({
      id: 'harvesters-error',
      type: 'symbol',
      source: 'harvesters',
      paint: {
        'text-color': '#f44336',
      },
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
      filter: ['==', ['get', 'error'], true],
    });
  }
  // Create source and layer for harvester routes
  if (!m.getSource('routes')) {
    m.addSource('routes', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }
  if (!m.getLayer('routes')) {
    m.addLayer({
      id: 'routes',
      type: 'line',
      source: 'routes',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 3,
        'line-opacity': 0.5,
      },
    });
  }
};

export default onMapLoad;
