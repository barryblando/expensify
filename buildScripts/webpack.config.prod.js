/**
 * WEBPACK PRODUCTION
 */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import autoprefixer from 'autoprefixer';
import WebpackMd5Hash from 'webpack-md5-hash';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import AsyncChunkNames from 'webpack-async-chunk-names-plugin';

const sourcePath = path.join(__dirname, '..', 'src');
const publicPath = path.join(__dirname, '..', 'public');

console.log(path.resolve(sourcePath, 'index.js'));
console.log('WEBPACK ENV:', process.env.NODE_ENV);

module.exports = {
  mode: 'production',
  entry: {
    index: ['babel-polyfill', path.resolve(sourcePath, 'index.js')],
  },
  output: {
    path: publicPath,
    publicPath: '',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          publicPath,
        }),
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [sourcePath, 'node_modules'],
  },
  plugins: [
    // PROD PLUGINS
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    }),
    new CopyWebpackPlugin([{ from: './src/images', to: 'images' }]),
    new WebpackMd5Hash(),
    new AsyncChunkNames(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app/index.html'),
      path: publicPath,
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 5 versions', 'ie >= 10'],
          }),
        ],
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        vendor: {
          // name of the chunk
          name: 'vendor',
          // sync + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /[\\/]node_modules[\\/]/,
          // priority
          priority: 20,
        },
        // common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
};
