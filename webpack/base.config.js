const webpack = require('webpack');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

module.exports = function configure(env, argv, wdir) {
  wdir = `${wdir}/`;

  return {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.ts']
    },
    resolveLoader: {
      modules: [ 'node_modules' ],
      extensions: [ '.js', '.json' ],
      mainFields: [ 'loader', 'main' ]
    },

    module: {
      rules: []
    },

    plugins: [
      new WebpackDeepScopeAnalysisPlugin(),
      new webpack.HotModuleReplacementPlugin({})
    ]
  };
};
