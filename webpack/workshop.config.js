const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function configure(env, arg, wdir, config) {
  wdir = `${wdir}/`;

  config.entry = [
    `${wdir}src/workshop/index.ts`,
    `${wdir}src/workshop/lib/workshop/index.css`
  ];

  config.output = {
    path: `${wdir}dist/workshop`,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  };

  config.module.rules.unshift(
      {
        test: /\.ts$/,
        include: wdir,
        loader: 'ts-loader?configFile=tsconfig.workshop.json'
      }
  );

  config.plugins.unshift(new CleanWebpackPlugin([`${wdir}dist/workshop/`], {allowExternal: true}));
  config.plugins.unshift(
      new HtmlWebpackPlugin({template: `${wdir}src/workshop/lib/workshop/index.html`, title: 'workshop'}));

  config.devServer = {
    contentBase: `${wdir}dist/workshop`,
    port: 9000,
    hot: true
  };

  return config;
};
