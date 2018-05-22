/**
 * DEVELOPMENT SERVER
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from './webpack.config.dev';

const { Signale } = require('signale');

const options = {
  contentBase: path.resolve(__dirname, 'public'),
  historyApiFallback: true, // Fallback HTML if there's 404 for client side routing (will update)
  hot: true,
  host: 'localhost',
  // open: true,
  // openPage: path.resolve(__dirname, 'public'),
  compress: true,
};

const optionSignale = {
  stream: process.stdout,
  scope: 'DevServer',
  types: {
    listening: {
      badge: '🛠️',
      color: 'blue',
      label: 'Listening',
    },
    error: {
      badge: '❌',
      color: 'red',
      label: 'Error',
    },
  },
};

const signal = new Signale(optionSignale);

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

const port = 5000;

server.listen(
  port,
  'localhost',
  err => (err ? signal.error(err) : signal.listening(`Port: ${port}`))
  // err => (err ? console.log(chalk.red(err)) : console.log(chalk.blue(`--> [DevServer] [Listening] on port: ${port}`)))
);
