
const
  path = require('path'),
  { merge } = require('webpack-merge'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '..', 'docs'),
    },
  },
});
