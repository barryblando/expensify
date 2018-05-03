/**
 * PRE-PRODUCTION SERVER
 */
import express from 'express';
import path from 'path';
import open from 'open';
import compress from 'compression';
import chalk from 'chalk';

/* eslint-disable no-console */

const port = 5000;
const app = express();

/**
 * This is NOT for actual production use.
 * This is just useful for hosting the minified production build for local debugging purposes.
 */

const checkForHTML = req => {
  const url = req.url.split('.');
  const extension = url[url.length -1];

  return ['/'].indexOf(extension) > -1 ? true : false; // for true - compress only .html files sent from server
};

const encodeResToGzip = contentType => (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);
  next();
};

app.use(compress({
  filter: (req, res) => {
    const x = compress.filter(req, res);
    console.log('To-be-Compressed', x, ' ', req.originalUrl);
    return x;
  }
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*.js', encodeResToGzip('text/javascript'));
app.get('*.css', encodeResToGzip('text/css'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(err) {
  return err ? console.log(chalk.red(error)) : open('http://localhost:' + port);
});
