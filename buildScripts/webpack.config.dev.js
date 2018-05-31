/**
 * WEBPACK DEVELOPMENT
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/app.js'],
  output: {
    path: path.join(__dirname, '../public'),
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
    new webpack.NamedModulesPlugin(), // Show Update modules in browser console When HMR updates
    new webpack.HotModuleReplacementPlugin(), // Enable HMR for dev config only
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
  ],
};
