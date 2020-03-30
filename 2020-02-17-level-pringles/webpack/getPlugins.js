const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.getPlugins = (isDevelopment) => {
  const plugins = [
    new MiniCssExtractPlugin({ filename: '../css/[name].css' })
  ];

  if (!isDevelopment) {
    plugins.push(new OptimizeCssAssetsPlugin())
  }

  return plugins;
};
