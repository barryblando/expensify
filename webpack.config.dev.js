/**
 * WEBPACK DEVELOPMENT
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './src/app.js',
    // './src/playground/hoc.js',
    // './src/playground/redux-101.js',
    // './src/playground/redux-expensify.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // Show Update modules in browser console When HMR updates
    new webpack.HotModuleReplacementPlugin(), // Enable HMR for dev config only
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
  ],
};
