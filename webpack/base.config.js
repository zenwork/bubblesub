const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');

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

    devServer: {
      contentBase: `${wdir}dist`,
      hot: true
    },
    plugins: [
      new WebpackDeepScopeAnalysisPlugin(),
      new webpack.HotModuleReplacementPlugin({}),
      new CopyPlugin([
                       { from: 'src/static/**/*', to: 'static', flatten: true }
                     ])
    ]
  };
};
