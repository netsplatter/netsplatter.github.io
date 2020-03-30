const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { DefinePlugin } = webpack;
// const PostCompile = require('post-compile-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              plugins: argv.mode !== 'production' ? ['react-hot-loader/babel'] : [],
            },
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      alias: {
        '@components': path.join(__dirname, 'src', 'components'),
        '@stores': path.join(__dirname, 'src', 'stores'),
        '@utils': path.join(__dirname, 'src', 'utils'),
        '@routes': path.join(__dirname, 'src', 'routes'),
        '@styles': path.join(__dirname, 'src', 'styles')
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: `./src/index.html`,
        inject: 'body',
        filename: `index.html`
      }),
      new HtmlWebpackHarddiskPlugin(),
      new CleanWebpackPlugin(['dist'], {
        verbose: true,
        dry: false
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode),
          HOST: JSON.stringify(process.env.HOST || 'http://api.hate.agency'),
        },
      }),
      /*new PostCompile(() => {

      })*/
      // new BundleAnalyzerPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true
    }
  }
};