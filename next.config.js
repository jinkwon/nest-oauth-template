module.exports = {
  webpack: (config) => {
    config.resolve.alias['mapbox-gl'] = 'maplibre-gl';
    return config;
  }
}
