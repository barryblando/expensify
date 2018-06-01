/**
 * PRE-PRODUCTION SERVER
 * This is NOT for actual production use.
 * This is just useful for hosting the minified production build for local debugging purposes.
 */
import express from 'express';
import path from 'path';
import compress from 'compression';
import chalk from 'chalk';

/* eslint-disable no-console */

const port = process.env.PORT || 5000;
const app = express();

// Reserved fn
const checkForHTML = req => { // eslint-disable-line
  const url = req.url.split('.');
  const extension = url[url.length - 1];

  return ['/'].indexOf(extension) > -1; // for true - compress only .html files sent from server
};

const encodeResToGzip = contentType => (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);
  next();
};

app.use(
  compress({
    filter: (req, res) => {
      const x = compress.filter(req, res);
      console.log('To-be-Compressed', x, ' ', req.originalUrl);
      return x;
    },
  })
);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*.js', encodeResToGzip('text/javascript'));
app.get('*.css', encodeResToGzip('text/css'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.listen(port, err => (err ? console.log(chalk.red(err)) : console.log(chalk.green('Server is Up!'))));
