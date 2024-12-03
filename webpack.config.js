const config = require ('./webpack.config.glob.js');
// const config = require ('./webpack.config.dll.js');
// const config = require ('./webpack.config.entry');

module.exports = function(env, argv) {
  console.log('NODE_ENV: ', env);
  console.log('argv: ', argv);
  return config(argv);
};