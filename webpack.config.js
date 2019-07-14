module.exports = (env, argv) => {

  let config = require('./webpack/base.config')(env, argv, __dirname);

  if (argv.workshop) {
    return require('./webpack/workshop.config')(env, argv, __dirname, config);
  }

  switch (argv.mode) {
    case 'production':
      config = require('./webpack/prod.config')(env, argv, __dirname, config);
      break;
    case 'development':
      config = require('./webpack/prod.config')(env, argv, __dirname, config);
      break;
    default:
      config = require('./webpack/prod.config')(env, argv, __dirname, config);
      break;
  }
  return config;
};
