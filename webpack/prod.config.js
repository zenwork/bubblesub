const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function configure(env, arg, wdir, config) {
  wdir = `${wdir}/`;

  config.entry = {
    'bubblesub': `${wdir}index.ts`,
    'bubblesub.min': `${wdir}index.ts`
}
  ;

  config.output = {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'bubblesub',
    umdNamedDefine: true
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
