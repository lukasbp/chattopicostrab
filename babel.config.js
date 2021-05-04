const path = require('path');

const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('./')],
      alias: {
        assets: './assets',
        components: './components',
        helpers: './helpers',
        router: './router',
        screens: './screens',
      },
    },
  ],
];

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: commonPlugins,
  };
};
