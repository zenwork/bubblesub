const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function configure(env, arg, wdir, config) {
  wdir = `${wdir}/`;

  config.entry = [
    `${wdir}index.ts`,
  ];

  config.output = {
    path: path.join(wdir, 'dist'),
    filename: 'index.js',
  };

  config.module.rules.unshift(
      {
        test: /\.ts$/,
        include: path.join(wdir, 'src'),
        exclude: path.join(wdir, 'src/demo'),
        loader: 'ts-loader?configFile=tsconfig.prod.json',
      },
  );

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

  return config;
};
