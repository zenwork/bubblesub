module.exports = (env, argv) => {

  let config = require('./webpack/base.config')(env, argv, __dirname);

  if (argv.demo) {
    return require('./webpack/demo.config')(env, argv, __dirname, config);
  }

  return require('./webpack/prod.config')(env, argv, __dirname, config);

};
