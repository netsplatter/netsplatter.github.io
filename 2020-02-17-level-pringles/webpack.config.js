const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lessPluginGlob = require('less-plugin-glob');

// Helpers
const { getPlugins } = require('./webpack/getPlugins');

module.exports = (env = {}) => {
  const { isDevelopment = false } = env;

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'source-map' : '',

    entry: {
      bundle: './src/js/index.js',
      preloader: './src/js/preloader.js',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './js'),
      publicPath: '/',
    },

    devServer: {
      contentBase: './dist',
      open: true,
      port: 8080,
      hot: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.(css)$/,
          use: [
            'css-hot-loader',
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelopment,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
      ]
    },

    plugins: [...getPlugins(isDevelopment)]
  }
};
