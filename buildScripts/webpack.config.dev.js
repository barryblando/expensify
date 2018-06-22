/**
 * WEBPACK DEVELOPMENT
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import DotEnv from 'dotenv';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const path = require('path');

DotEnv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log(`Using file '.env.${process.env.NODE_ENV}' for env variable`);

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '..', 'app'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    }),
    new webpack.NamedModulesPlugin(), // Show Update modules in browser console When HMR updates
    new webpack.HotModuleReplacementPlugin(), // Enable HMR for dev config only
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 5001,
        proxy: 'http://localhost:5000',
        ws: true,
        open: false,
      },
      {
        reload: false,
      }
    ),
  ],
};
