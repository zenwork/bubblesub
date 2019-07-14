const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function configure(env, arg, wdir, config) {
  wdir = `${wdir}/`;

  config.entry = [
    `${wdir}index.ts`,
  ];

  config.output = {
    path: path.join(wdir, 'dist'),
    filename: 'index.js'
  };

  config.module.rules.unshift(
      {
        test: /\.ts$/,
        include: path.join(wdir, 'src'),
        loader: 'ts-loader?configFile=tsconfig.app.json',
      },
  );

  config.plugins.unshift(new CleanWebpackPlugin([`${wdir}dist/app`], {allowExternal: true}));

  config.performance = {
    hints: 'warning',
    maxEntrypointSize: 260000,
    maxAssetSize: 2000000,
  };

  config.optimization = {
    'concatenateModules': false,
    minimizer: [
      new TerserPlugin({
                         parallel: true,
                         sourceMap: true,
                         terserOptions: {
                           ecma: 6,
                         },
                       })
    ]
  };

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9090,
    hot: true,
    proxy: {
      '**': 'http://localhost:11030',
    },
  };

  return config;
};
