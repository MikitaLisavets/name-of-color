var webpack = require("webpack");

module.exports = {
  entry: './app/app.ts',
  output: {
    path: './dist/',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      { test: /^(?!.*(spec|e2e)).*ts$/, loader: 'ts-loader' , exclude: [/node_modules/] }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})
  ],
  devtool: 'source-map'
}
