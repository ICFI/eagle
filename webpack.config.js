const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main/webapp/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: {
          loader: "css-loader"
        }
      },
      {
        test: /\.svg?$/,
        exclude: /node_modules/,
        use: {
          loader: "svg-url-loader"
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
        sourceMap: true
    }),
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};