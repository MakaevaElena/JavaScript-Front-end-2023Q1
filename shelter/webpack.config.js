// https://webpack.js.org/guides/getting-started/#basic-setup
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    // devtool: isProduction ? '' : 'source-map',
    mode: 'production',
    watch: !isProduction,
    // entry: ['./src/index.js', './src/sass/style.scss'],
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        //!не переименовывается css
        filename: 'style.css',
      }),
    ],
  };
  return config;
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './src/js/index.js',
//   module: {
//     rules: [
//       { test: /\.svg$/, use: 'svg-inline-loader' },
//       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//       { test: /\.(js)$/, use: 'babel-loader' },
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index_bundle.js',
//   },
//   plugins: [new HtmlWebpackPlugin()],
//   mode: 'production',
// };
