const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { DefinePlugin } = webpack;
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const SymlinkWebpackPlugin = require('symlink-webpack-plugin');

module.exports = (env, argv) => {

  const { mode } = env;

  const envCfg = {
    production: {
      devtool: 'source-map',
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
        ]
      },
      plugins: [
        new SymlinkWebpackPlugin([{
          origin: '../licenses',
          symlink: 'licenses'
        }])
      ]
    },
    development: {
      devtool: 'eval-sourcemap',
      devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        hot: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin(),
      ]
    }
  };

  const main = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.[hash].js'
    },
    mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          // ASSET LOADER
          // Reference: https://github.com/webpack/file-loader
          // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
          // Rename the file using the asset hash
          // Pass along the updated reference to your code
          // You can add here any file extension you want to get copied to your output
          test: /\.(png|jpg|jpeg|gif|svg|woff|otf|woff2|ttf|eot)$/,
          loader: 'file-loader',
          exclude: /index\.html$/
        },
        {
          test: /\.(mov|mp4)$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: `./src/index.html`,
        inject: 'body',
        filename: `index.html`,
        favicon: "./src/img/favicon.ico"
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: `./src/index.php`,
        inject: 'body',
        filename: `index.php`,
        favicon: "./src/img/favicon.ico"
      }),
      new CleanWebpackPlugin(['dist'], {
        verbose: true,
        dry: false
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[hash].css",
        chunkFilename: "[id].css"
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(mode),
          HOST: JSON.stringify("https://agent-whiskeycavalier.ru"),
          TARGET_URL: JSON.stringify("https://ya.cc/5PUfc")
        },
      }),
    ]
  };

  return merge(main, envCfg[mode]);
};