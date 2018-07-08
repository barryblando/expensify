/**
 * DEVELOPMENT SERVER
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Signale } from 'signale';
import path from 'path';
import webpackConfig from './webpack.config.dev';
import { devSignale } from './optionSignale';

const options = {
  contentBase: path.resolve(__dirname, '..', 'public'),
  historyApiFallback: true, // Fallback HTML if there's 404 for client side routing (will update)
  hot: true,
  host: 'localhost',
  // open: true,
  // openPage: path.resolve(__dirname, 'public'),
  compress: true,
};

const signal = new Signale(devSignale);

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, options);

const PORT = 5000;

server.listen(PORT, 'localhost', err => (err ? signal.error(err) : signal.listening(`Port: ${PORT}`)));
