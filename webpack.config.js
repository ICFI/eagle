const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
          loader: "babel-loader",
          options: {
          	"presets": ["react", "es2015", "stage-1"]
          }
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
};