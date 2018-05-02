/**
 * DEVELOPMENT SERVER
 */

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from './webpack.config.dev';
import chalk from 'chalk';

const options = {
  contentBase: path.resolve(__dirname, 'public'),
  hot: true,
  host: 'localhost',
  open: true,
  openPage: path.resolve(__dirname, 'public'),
  compress: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

const port = 5000;

server.listen(port, 'localhost', (error) => {
  if (error) {
    return console.log(chalk.red(error));
  }
  console.log(chalk.blue(`--> [DevServer] [Listening] on port: ${port}`));
});