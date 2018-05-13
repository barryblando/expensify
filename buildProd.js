/* eslint-disable no-console */
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from './webpack.config.prod';

process.env.NODE_ENV = 'production'; // Mode

console.log(chalk.blue('Generating minified bundle for Production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // so a fatal error occurred.
    console.log(chalk.red(err));
    return 1; // Stop here.
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalk.green('Your app has been built for production and written to /dist!'));

  return 0; // Return 0 signifies Success
});
