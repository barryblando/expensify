/* eslint-disable no-console */
import webpack from 'webpack';
import { Signale } from 'signale';
import webpackConfig from './webpack.config.prod';
import { prodSignale } from './optionSignale';

console.log('BUILD PROD ENV:', process.env.NODE_ENV); // Mode

const signal = new Signale(prodSignale);

console.log(signal.building('Generating minified bundle for Production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // so a fatal error occurred.
    console.log(signal.error(err));
    return 1; // Stop here.
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(signal.error(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(signal.warning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(signal.warning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(signal.success('Your app has been built for production and written to /dist!'));

  return 0; // Return 0 signifies Success
});
