const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './index.ts',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.ts$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
  resolve: {extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']},
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: `./dist`,
    port: 9000,
    hot: true,
  }
};
