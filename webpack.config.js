var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    './public/app': path.resolve(__dirname, 'client/index.jsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './')
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};
