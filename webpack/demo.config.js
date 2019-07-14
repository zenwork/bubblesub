const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function configure(env, arg, wdir, config) {
  wdir = `${wdir}/`;

  config.entry = [
    `${wdir}demo.ts`,
  ];

  config.output = {
    path: path.join(wdir, 'demo'),
    filename: 'demo.js',
  };

  config.module.rules.unshift(
      {
        test: /\.ts$/,
        include: path.join(wdir, 'src'),
        loader: 'ts-loader?configFile=tsconfig.demo.json',
      },
  );

  config.plugins.unshift(
      new HtmlWebpackPlugin({template: `${wdir}src/demo/index.html`, title: 'Demo'})
  );

  return config;
};
