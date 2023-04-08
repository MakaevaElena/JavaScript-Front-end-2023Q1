// https://webpack.js.org/guides/getting-started/#basic-setup
const path = require('path');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    mode: 'production',
    watch: !isProduction,
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js',
    },
  };
  return config;
};
